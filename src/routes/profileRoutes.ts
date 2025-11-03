import express from "express";
import multer from "multer";
import path from "path";
import Profile from "../models/profileModel";

const router = express.Router();

// 🔹 Rasm saqlanadigan joyni belgilaymiz
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 🔹 Profil yaratish yoki yangilash
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { fullName, phone, email, address } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newProfile = new Profile({ fullName, phone, email, address, image });
    await newProfile.save();

    res.status(201).json({
      message: "Profil saqlandi",
      profile: newProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverda xatolik", error });
  }
});

export default router;