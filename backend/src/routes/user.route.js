import { Router } from "express";
import { users } from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.route("/users").get(users);

export default UserRouter;
