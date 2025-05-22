import zod from "zod";
import {
  createUser,
  findUserByEmailOrUsername,
  generateAccessAndRefreshToken,
} from "../services/auth.services.js";
import { options } from "../config.js";
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
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    // Demo OTP
    let verificationOtp = 123456;

    // send verification email on user email
    const verificationLink = `http://localhost:5173/verify-otp?userId=${user?._id}`;

    // Mail Options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user?.email,
      subject: "Welcome to MERN Auth System",
      html: `<p>Welcome to MERN Authentication System, Your Account is Created with Username : ${user?.username} Email : ${user?.email}</p>
    <br>
      <section
        style="width: 100%; height: 100%; padding: 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgb(255, 148, 72);">
        <h2>Please Verify the Email with OTP ${verificationOtp}</h2>
        <h1>
            By Clicking
            <button
                style="background: linear-gradient(90deg, #ff6a00, #ee0979); color: #fff; border: none; padding: 12px 28px; border-radius: 30px; font-size: 1.2em; cursor: pointer; box-shadow: 0 4px 14px rgba(238,9,121,0.2); transition: background 0.3s;">
                <a href="${verificationLink}" style="color: #fff; text-decoration: none;">Verify</a>
            </button>
        </h1>
    </section>`,
    };

    const transporter = await createTransporter();

    if (!transporter) {
      console.error(
        "Email Not Sent: Transporter is null.  Check your SMTP credentials."
      );
      return false;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);

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
