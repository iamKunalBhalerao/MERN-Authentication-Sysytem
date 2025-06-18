import { Router } from "express";
import { getUserData, users } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.meddleware.js";

const UserRouter = Router();

UserRouter.route("/users").get(users);
UserRouter.route("/userdetails").get(authMiddleware, getUserData);

export default UserRouter;
