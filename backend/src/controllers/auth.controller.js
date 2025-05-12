import zod from "zod";
import User from "../models/user.model.js";
import { findUserByEmailOrUsername } from "../services/auth.services.js";
import { hashPassword } from "../utils/auth.utils.js";

const signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

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
      throw "Invalid Credentials !!!";
    }

    const findUser = await findUserByEmailOrUsername(email, username);

    if (findUser) {
      throw "User Alredy Exists !!!";
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
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
    res.status(400).json({
      message: "Something Went Wrong While singing In User !!!",
      Error: error,
    });
  }
};

const signup = async (req, res) => {
  res.status(200).json({
    message: "This is Sign Up Route",
  });
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
