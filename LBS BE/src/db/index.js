import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectToDB = async () => {
  try {
    const connecionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected successfully!!! DB Host: ${connecionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Mongo DB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectToDB;