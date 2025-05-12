import { Router } from "express";

const authRouter = Router();

// Route Imports
import {
  logout,
  signin,
  signup,
  users,
} from "../controllers/auth.controller.js";

// Route Declaration
authRouter.route("/signin").post(signin);
authRouter.route("/signup").post(signup);
authRouter.route("/logout").post(logout);
authRouter.route("/users").get(users);

export default authRouter;
