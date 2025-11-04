import express from "express";
import multer from "multer";
import Profile from "../models/profileModel.js";

const router = express.Router();

// multer sozlamasi
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST /api/profile
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { fullName, phone, email, address } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newProfile = new Profile({
      fullName,
      phone,
      email,
      address,
      image,
    });

    await newProfile.save();
    res.status(201).json({ message: "Profil saqlandi", profile: newProfile });
  } catch (error) {
    console.error("Profil saqlashda xato:", error);
    res.status(500).json({ message: "Serverda xatolik", error });
  }
});

export default router;