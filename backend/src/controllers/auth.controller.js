import zod from "zod";
import {
  findUserByEmailOrUsername,
  generateAccessAndRefreshToken,
} from "../services/auth.services.js";
import { options } from "../config.js";
import User from "../models/user.model.js";
import { mailOptionsSender } from "../services/mail.services.js";
import { ErrorHandler } from "../utils/authErrorHandler.js";
import { createTransporter } from "../utils/mail.handler.js";
import { comparePassword, hashPassword } from "../utils/auth.utils.js";

// Signing in User
const signin = async (req, res, next) => {
  // Gettting username, email and password from user
  // validating inputs with zod validating libreary
  // find user in DB with these credentials
  // if available then throw message user is alredy exists
  // if not then hash the password using bcrypt libreary
  // create user in DB with user information with hashed password
  // send user data as response
  try {
    // Taking inputs from body by user
    const { username, email, password } = req.body;

    // Validating User Inputs
    const requireBody = zod.object({
      username: zod
        .string({
          required_error: "Username is Required !!!",
          invalid_type_error: "Username must be a String",
        })
        .min(6)
        .max(50),
      email: zod
        .string({
          required_error: "Email is Required !!!",
          invalid_type_error: "Email must be a String",
        })
        .min(5)
        .max(150)
        .email(),
      password: zod.string().min(6).max(200),
    });

    const parseRequireBody = requireBody.safeParse(req.body);

    if (!parseRequireBody.success) {
      throw new ErrorHandler("Invalid Credentials !!!", 400);
    }

    // Finding User is alredy exists or not
    const findUser = await findUserByEmailOrUsername(email, username);

    if (findUser) {
      throw new ErrorHandler("User Alredy Exists !!!", 400);
    }

    // Hashing Password
    const hashedPassword = await hashPassword(password);

    // Creating User
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const verificationOtp = await mailOptionsSender(user);

    user.otp = verificationOtp;
    await user.save({ validateBeforeSave: false });

    const updatedUser = await User.findById(user?._id).select(
      "-password -refreshToken"
    );

    res.status(200).json({
      error: false,
      message: "You are Signed In Successfully.",
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Signing Up User
const signup = async (req, res, next) => {
  // getting usernema, email and password from user
  // validating user inputs by zod libreary
  // check user is available in DB or not
  // if not then send error user with these email or username is not Exists
  // if user is exists in DB then
  // compare user password with hashed password stored in DB with bcrypt librearys compare method
  // if password is incorrect then send error password is incorrect
  // if password is correct then
  // generate Access and RefreshToken
  // store Refresh Token in DB and
  // Store both Access and Refresh Token in cookies
  //  Send response
  try {
    // Taking inputs from body by user
    const { username, email, password } = req.body;

    // Validating User Inputs
    const requireBody = zod.object({
      username: zod
        .string({
          required_error: "Username is Required !!!",
          invalid_type_error: "Username must be a String",
        })
        .min(6)
        .max(50),
      email: zod
        .string({
          required_error: "Email is Required !!!",
          invalid_type_error: "Email must be a String",
        })
        .min(5)
        .max(150)
        .email(),
      password: zod.string().min(6).max(200),
    });

    const parseRequireBody = requireBody.safeParse(req.body);

    if (!parseRequireBody.success) {
      throw new ErrorHandler("Credentials Incorrect !!!", 400);
    }

    // Finding User is alredy exists or not
    const user = await findUserByEmailOrUsername(email, username);

    if (!user) {
      throw new ErrorHandler("Username or Email Does Not Exists !!!", 400);
    }

    // Compare Password
    const comparedPassword = await comparePassword({
      password,
      hashedPassword: user.password,
    });

    if (!comparedPassword) {
      throw new ErrorHandler("Invalid Password !!!", 400);
    }

    // Generate Tokens
    const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
      user
    );

    // Updating RefreshToken in DB
    user.refreshToken = RefreshToken;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .cookie("accessToken", AccessToken, options)
      .cookie("refreshToken", RefreshToken, options)
      .json({
        error: false,
        message: "You are Signed Up Successfully.",
        user,
        AccessToken,
        RefreshToken,
      });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.status(200).json({
    message: "This is Log Out Route",
  });
};

const users = async (req, res) => {
  res.status(200).json({
    message: "This is Users Route",
  });
};

export { signin, signup, logout, users };
