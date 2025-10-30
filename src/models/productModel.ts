import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["coffee", "dessert", "tea"], // faqat shu turlar bo‘lishi mumkin
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);