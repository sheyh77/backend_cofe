import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes";
import path from "path";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import profileRoutes from "./routes/profileRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Auth server ${PORT}-portda ishlayapti`));