import express from "express";
import Profile from "../models/profileModel";

const router = express.Router();

// POST /api/profile — foydalanuvchi ma'lumotlarini saqlash
router.post("/", async (req, res) => {
  try {
    const { fullName, phone, email, address } = req.body;

    const newProfile = new Profile({ fullName, phone, email, address });
    await newProfile.save();

    res.status(201).json({ message: "Profil saqlandi", profile: newProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverda xatolik", error });
  }
});

export default router;