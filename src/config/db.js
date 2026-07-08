import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    console.log("URI Exists:", !!config.MONGO_URI);
    console.log("ReadyState Before:", mongoose.connection.readyState);

    await mongoose.connect(config.MONGO_URI);

    console.log("✅ Database Connected");
    console.log("ReadyState After:", mongoose.connection.readyState);
  } catch (error) {
    console.error("❌ MongoDB Connect Error:", error.message);
    throw error;
  }
};

export default connectDB;