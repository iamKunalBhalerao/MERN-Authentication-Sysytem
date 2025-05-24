import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const findUserByEmailOrUsername = async (email, username) => {
  return await User.findOne({
    $and: [{ email }, { username }],
  });
};

const generateAccessAndRefreshToken = async (user) => {
  const AccessToken = await jwt.sign(
    {
      _id: user?._id,
      email: user?.email,
      username: user?.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIREY }
  );
  const RefreshToken = await jwt.sign(
    {
      _id: user?._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIREY }
  );

  return { AccessToken, RefreshToken };
};

export { findUserByEmailOrUsername, generateAccessAndRefreshToken };
