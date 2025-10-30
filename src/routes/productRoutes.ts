import express from "express";
import { getProducts, addProduct, deleteProduct, getProductsByType } from "../controllers/productController";
import { upload } from "../middleware/upload";

const router = express.Router();

// Barcha mahsulotlarni olish
router.get("/", getProducts);

// Yangi mahsulot qo‘shish (rasm bilan)
router.post("/", upload.single("image"), addProduct);

router.get("/:type", getProductsByType);

// Mahsulotni o‘chirish
router.delete("/:id", deleteProduct);

export default router;