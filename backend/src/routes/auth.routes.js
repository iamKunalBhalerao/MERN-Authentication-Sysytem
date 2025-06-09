import { Router } from "express";

const authRouter = Router();

// Route Imports
import {
  findUserById,
  logout,
  refreshToken,
  signin,
  signup,
  users,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.meddleware.js";

// Route Declaration
authRouter.route("/signin").post(signin);
authRouter.route("/signup").post(signup);
authRouter.route("/logout").post(authMiddleware, logout);
authRouter.route("/refreshtoken").post(refreshToken);
authRouter.route("/users").get(users);
authRouter.route("/user/:userId").get(findUserById);

export default authRouter;
