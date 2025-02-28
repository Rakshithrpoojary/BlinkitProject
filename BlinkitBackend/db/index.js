import mongoose from "mongoose";

export const DatabaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected");
  } catch (err) {
    console.log("Database connection failed", err.message);
  }
};
