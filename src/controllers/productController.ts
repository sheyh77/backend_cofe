import { Request, Response } from "express";
import { Product } from "../models/productModel";

// Barcha mahsulotlarni olish
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Xatolik: " + error });
  }
};

// Yangi mahsulot qo‘shish
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, price, type } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = new Product({ title, description, price, image, type });
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Mahsulot qo‘shildi ✅", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Xatolik: " + error });
  }
};

// Mahsulotni o‘chirish
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Mahsulot o‘chirildi ❌" });
  } catch (error) {
    res.status(500).json({ message: "Xatolik: " + error });
  }
};

export const getProductsByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const products = await Product.find({ type });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Mahsulotlarni olishda xatolik", error });
  }
};
