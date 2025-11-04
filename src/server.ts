// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/authRoutes";
// import connectDB from "./config/db";
// import productRoutes from "./routes/productRoutes";
// import path from "path";
// import adminRoutes from "./routes/adminRoutes";
// import userRoutes from "./routes/userRoutes";
// import profileRoutes from "./routes/profileRoutes";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use("/uploads", express.static("uploads"));

// connectDB();

// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/products", productRoutes); 
// app.use("/api/users", userRoutes);
// app.use("/api/profile", profileRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Auth server ${PORT}-portda ishlayapti`));

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";

import authRoutes from "./routes/authRoutes";
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import profileRoutes from "./routes/profileRoutes";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// === Multer sozlamasi ===
const upload = multer({ dest: "uploads/" });

// === Fayl yuklash uchun endpoint ===
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Hech qanday fayl yuborilmadi" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Upload xatosi:", error);
    res.status(500).json({ message: "Fayl yuklashda xato yuz berdi" });
  }
});

// === Static papka ===
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// === MongoDB ulanishi ===
connectDB();

// === Route’lar ===
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);

// === Server ishga tushishi ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server ${PORT}-portda ishlayapti`));
