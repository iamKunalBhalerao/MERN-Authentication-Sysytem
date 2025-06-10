import zod from "zod";
import jwt from "jsonwebtoken";
import {
  findUserByEmailOrUsername,
  generateAccessAndRefreshToken,
} from "../services/auth.services.js";
import { options } from "../config.js";
import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/auth.utils.js";

// Signing in User
const signup = async (req, res) => {
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
        .min(3)
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
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials !!!",
      });
    }

    // Finding User is alredy exists or not
    const findUser = await findUserByEmailOrUsername(email, username);

    if (findUser) {
      return res.status(400).json({
        success: false,
        message: "User Alredy Exists !!!",
      });
    }

    // Hashing Password
    const hashedPassword = await hashPassword(password);

    // Creating User
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

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
        success: true,
        message: "You are Signed Up Successfully.",
        user,
        AccessToken,
        RefreshToken,
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error While Creating User !!!",
      Error: error,
    });
  }
};

// Signing Up User
const signin = async (req, res) => {
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
        .min(3)
        .max(50),
      email: zod
        .string({
          required_error: "Email is Required !!!",
          invalid_type_error: "Email must be a String",
        })
        .min(5)
        .max(150)
        .email(),
      password: zod
        .string()
        .min(6, "Password must be 6 characters long.")
        .max(200),
    });

    const parseRequireBody = requireBody.safeParse(req.body);

    if (!parseRequireBody.success) {
      return res.status(400).json({
        success: false,
        message: "Credentials Incorrect !!!",
      });
    }

    // Finding User is alredy exists or not
    const user = await findUserByEmailOrUsername(email, username);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Username !!!",
      });
    }

    // Compare Password
    const comparedPassword = await comparePassword({
      password,
      hashedPassword: user.password,
    });

    if (!comparedPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password !!!",
      });
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
        success: true,
        message: "You are Signed In Successfully.",
        user,
        AccessToken,
        RefreshToken,
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error While Loging in User !!!",
      Error: error,
    });
  }
};

// Refresh Access and Refresh Tokens
const refreshAccessAndRefreshTokens = async (req, res, next) => {
  try {
    const refreshToken = res.cookie.refreshToken || req.body.refreshToken;
    if (!refreshToken) {
      return res.status(404).json({
        success: false,
        message: "RefreshToken is Not found !!!",
      });
    }

    // verify the incoming refresh Token for that token and key is required

    const { err, decoded } = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      function (err, decoded) {
        return { err, decoded };
      }
    );

    if (err) {
      return res.status(401).json({
        success: false,
        message: `Invalid RefreshToken !!! ${err}`,
      });
    }

    const user = await User.findById(decoded?.data?._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is no Found !!!",
      });
    }

    if (user?.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token is expired or not Valid",
      });
    }

    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options);

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
        message: "Access and Refresh Token is Updated Successfully",
        user,
        AccessToken,
        RefreshToken,
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error While refreshing Tokens !!!",
      Error: error,
    });
  }
};

// Logout User
const logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $set: {
        refreshToken: undefined,
      },
    });
    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "User is Loged Out SuccessFully.",
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error While Loging Out User !!!",
      Error: error,
    });
  }
};

// See All Users
const users = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: "All Users Fetched Successfully.",
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error While Fteching Users.",
    });
  }
};

export { signin, signup, refreshAccessAndRefreshTokens, logout, users };
