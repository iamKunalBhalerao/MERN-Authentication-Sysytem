import zod from "zod";
import {
  createUser,
  findUserByEmailOrUsername,
  generateAccessAndRefreshToken,
} from "../services/auth.services.js";
import { comparePassword, hashPassword } from "../utils/auth.utils.js";
import { options } from "../config.js";
import { ErrorHandler } from "../utils/authErrorHandler.js";

// Signing in User
const signin = async (req, res, next) => {
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
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      error: false,
      message: "You are Signed In Successfully.",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Signing Up User
const signup = async (req, res, next) => {
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
