import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token is missing !!!",
      });
    }

    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (decoded) {
      req.userId = decoded._id;
      next();
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Request !!!",
      Error: error,
    });
  }
};
