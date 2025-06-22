import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "https://mernauthsys.vercel.app",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Router Imports
import authRouter from "./routes/auth.routes.js";
import UserRouter from "./routes/user.route.js";

// Router calls
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", UserRouter);

export default app;
