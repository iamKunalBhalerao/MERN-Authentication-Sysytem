import zod from "zod";
import jwt from "jsonwebtoken";
import {
  findUserByEmailOrUsername,
  generateAccessAndRefreshToken,
} from "../services/auth.services.js";
import {
  options,
  resetOTPMailTemplate,
  verifyOTPMailTemplate,
  welcomeMailTemplate,
} from "../config.js";
import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/auth.utils.js";
import sendMail from "../utils/nodemailer.js";

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

    if (!username || !email || !password) {
      return res.status(402).json({
        success: false,
        message: "All Fields are REQUIRED !!!",
      });
    }

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
        message: "Invalid Credentials !",
      });
    }

    // Finding User is alredy exists or not
    const findUser = await findUserByEmailOrUsername(email);

    if (findUser) {
      return res.status(400).json({
        success: false,
        message: "User Alredy Exists !",
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

    // Send Welcome Email

    const mailHTML = await welcomeMailTemplate({
      username: user?.username,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "You're In! Welcome to Our MERN Auth System.",
      text: `Welcome to Our MERN Auth System. You are Signed Up with Email: ${user?.email}`,
      html: mailHTML,
    };

    const mailSentORNot = await sendMail(mailOptions);

    if (!mailSentORNot) {
      return res.status(402).json({
        message: "Error While sending Mail !",
      });
    }

    return res
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
    res.status(400).json({
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(402).json({
        message: "All Fields are REQUIRED !",
      });
    }

    // Validating User Inputs
    const requireBody = zod.object({
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
        message: "Credentials Incorrect !",
      });
    }

    // Finding User is alredy exists or not
    const user = await findUserByEmailOrUsername(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Username !",
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
        message: "Invalid Password !",
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
const refreshAccessAndRefreshTokens = async (req, res) => {
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

// Send Verification OTP
const sendVerificationOTP = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return res.staus(404).json({
        success: false,
        message: "User Not Found !!!",
      });
    }

    if (user.emailVerified) {
      return res.status(202).json({
        success: false,
        message: "User is Alredy Verified.",
      });
    }

    const generateOTP = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    ).toString();

    user.verifyOtp = generateOTP;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const otpHTML = await verifyOTPMailTemplate(generateOTP);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your Verification OTP. Welcome to Our MERN Auth System.",
      text: `Welcome to Our MERN Auth System. Your verification OTP is : ${generateOTP}`,
      html: otpHTML,
    };

    const mailSentORNot = await sendMail(mailOptions);

    if (!mailSentORNot) {
      return res.status(402).json({
        message: "Error While sending Mail !!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Verification OTP sent Successfully to Email.",
      generateOTP,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error While Sending Verification OPT to User !!!",
      Error: error,
    });
  }
};

// Verify the OTP gived by user
const verifyOTPandEmail = async (req, res) => {
  try {
    const userId = req.userId;
    const commingOTP = req.body.otp;

    const user = await User.findById(userId).select("-password -refreshToken");

    if (user.verifyOtp === "" || commingOTP !== user.verifyOtp) {
      return res.status(403).json({
        success: false,
        message: "Otp is INCORRECT !!!",
      });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has been EXPIRED !!! resend the OTP please.",
      });
    }

    user.emailVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Your Email is verifyed Successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error While Verifying OTP !!!",
      Error: error,
    });
  }
};

// CHect if user is Authenticated or Not
const isAuthenticated = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User is Authenticated",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User is NOT AUTHENTICATED !!!",
      Error: error,
    });
  }
};

// Send Reset Password otp
const sendResetPasswordOtp = async (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(404).json({
        message: "Email is Required !!!",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    const generateOTP = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    ).toString();

    user.resetOtp = generateOTP;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const resetOtpHTML = await resetOTPMailTemplate(generateOTP);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your Verification OTP. Welcome to Our MERN Auth System.",
      text: `Welcome to Our MERN Auth System. Your verification OTP is : ${generateOTP}`,
      html: resetOtpHTML,
    };

    const mailSentORNot = await sendMail(mailOptions);

    if (!mailSentORNot) {
      return res.status(402).json({
        message: "Error While sending Mail !!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reset OTP sent Successfully to Email.",
      generatedRestOTP: generateOTP,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error While Sending Reset Password OTP !!!",
      Error: error,
    });
  }
};

// Verify the Reset OTP gived by user
const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(401).json({
        message: "Email, Otp ans New Password is Required !!!",
      });
    }

    const user = await User.findOne({ email }).select(
      "-password -refreshToken"
    );

    if (user.resetOtp === "" || otp !== user.resetOtp) {
      return res.status(403).json({
        success: false,
        message: "Otp is INCORRECT !!!",
      });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has been EXPIRED !!! resend the OTP please.",
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message:
        "Your Reset Password OTP verifyed Successfully, Your Password is reset successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error While Verifying Reset OTP !!!",
      Error: error,
    });
  }
};

export {
  signin,
  signup,
  refreshAccessAndRefreshTokens,
  logout,
  sendVerificationOTP,
  verifyOTPandEmail,
  isAuthenticated,
  sendResetPasswordOtp,
  verifyResetOTP,
};
