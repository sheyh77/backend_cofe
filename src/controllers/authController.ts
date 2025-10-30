import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, phone, password } = req.body;

    const existUser = await User.findOne({ username });
    if (existUser)
      return res.status(400).json({ message: "Bu username allaqachon mavjud" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, phone, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Ro‘yxatdan o‘tish muvaffaqiyatli ✅" });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi: " + err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Parol noto‘g‘ri" });

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({ message: "Kirish muvaffaqiyatli ✅", token, role: "user" });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi: " + err });
  }
};