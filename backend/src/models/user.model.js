import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is Required !!!"],
    },
    password: {
      type: String,
      required: [true, "Password is Required !!!"],
    },
    refreshToken: {
      type: String,
    },
    otp: {
      type: String,
      max: 6,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export default User;
