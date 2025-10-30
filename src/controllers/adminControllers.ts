import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const adminLogin = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    return res.json({
      message: "Admin sifatida kirish muvaffaqiyatli ✅",
      token,
      role: "admin",
    });
  }

  return res.status(401).json({ message: "Admin ma’lumotlari noto‘g‘ri ❌" });
};