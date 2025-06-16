import { Router } from "express";

const authRouter = Router();

// Route Imports
import {
  logout,
  refreshAccessAndRefreshTokens,
  signin,
  signup,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.meddleware.js";

// Route Declaration
authRouter.route("/signin").post(signin);
authRouter.route("/signup").post(signup);
authRouter.route("/logout").post(authMiddleware, logout);
authRouter.route("/refreshtoken").post(refreshAccessAndRefreshTokens);

export default authRouter;
