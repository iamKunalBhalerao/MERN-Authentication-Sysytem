import { Router } from "express";

const UserRouter = Router();

// Route Imports
import {
  logout,
  signin,
  signup,
  users,
} from "../controllers/user.controller.js";

// Route Declaration
UserRouter.route("/signin").post(signin);
UserRouter.route("/signup").post(signup);
UserRouter.route("/logout").post(logout);
UserRouter.route("/users").get(users);

export default UserRouter;
