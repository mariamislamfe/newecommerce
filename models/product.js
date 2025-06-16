import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "User" }, // خلي الـ ref = اسم الموديل User لو موجود
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: Array, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Number, required: true },
});

// هنا نعمل check قبل التسجيل عشان نتفادى errors وقت hot-reload
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
