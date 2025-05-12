import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/user", UserRouter);

export default app;
