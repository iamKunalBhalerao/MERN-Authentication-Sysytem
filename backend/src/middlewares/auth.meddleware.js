import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/authErrorHandler.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      res.cookie?.accessToken || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      throw new ErrorHandler("Token is missing !!!", 404);
    }

    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);

    if (decoded) {
      req.userId = decoded._id;
      next();
    }
  } catch (error) {
    next(error);
  }
};
