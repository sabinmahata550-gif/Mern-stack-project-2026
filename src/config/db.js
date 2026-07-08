import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    
    await mongoose.connect(config.MONGO_URI);

    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ MongoDB Connect Error:", error.message);
    throw error;
  }
};

export default connectDB;