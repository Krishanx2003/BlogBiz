import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI as string);
    if (connection.readyState === 1) {
      console.log("MongoDB connected successfully");
      return true;
    } else {
      throw new Error("MongoDB connection failed");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return false;
  }
};
