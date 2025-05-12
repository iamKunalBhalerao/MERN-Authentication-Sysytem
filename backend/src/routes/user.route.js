import { Router } from "express";

const UserRouter = Router();

// Route Imports
import { signin, signup } from "../controllers/user.controller.js";

// Route Declaration
UserRouter.route("/signin").post(signin);
UserRouter.route("/signup").post(signup);

export default UserRouter;
