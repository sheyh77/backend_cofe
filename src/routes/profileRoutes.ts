import express from "express";
import Profile from "../models/profileModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { fullName, phone, email, address, image } = req.body;
    const newProfile = new Profile({ fullName, phone, email, address, image });
    await newProfile.save();
    res.status(201).json({ message: "Profil saqlandi", profile: newProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverda xatolik", error });
  }
});

export default router;