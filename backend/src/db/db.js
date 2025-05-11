import mongoose from "mongoose";
import { DBName } from "../config.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DBName}`
    );
    console.log(
      `MongoDB Connected !! DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
