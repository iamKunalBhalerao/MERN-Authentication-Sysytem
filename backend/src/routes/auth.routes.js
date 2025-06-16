import { Router } from "express";

const authRouter = Router();

// Route Imports
import {
  signup,
  signin,
  logout,
  refreshAccessAndRefreshTokens,
  sendVerificationOTP,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.meddleware.js";

// Route Declaration
authRouter.route("/signin").post(signin);
authRouter.route("/signup").post(signup);
authRouter.route("/logout").post(authMiddleware, logout);
authRouter
  .route("/refreshtoken")
  .post(authMiddleware, refreshAccessAndRefreshTokens);
authRouter
  .route("/sendverificationotp")
  .post(authMiddleware, sendVerificationOTP);

export default authRouter;
