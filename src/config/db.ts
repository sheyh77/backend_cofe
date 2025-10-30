import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("✅ MongoDB ulandi");
  } catch (error) {
    console.error("❌ MongoDB ulanishida xato:", error);
    process.exit(1);
  }
};

export default connectDB;