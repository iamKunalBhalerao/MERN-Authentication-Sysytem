import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const whitelist = ["https://mernauthsys.vercel.app", "http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true); // Allow the request
      } else {
        console.log(`CORS Error: Origin ${origin} not allowed.`);
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Router Imports
import authRouter from "./routes/auth.routes.js";
import UserRouter from "./routes/user.route.js";

// Router calls
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", UserRouter);

export default app;
