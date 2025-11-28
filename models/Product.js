import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  image: { type: [String], default: [] },
  date: { type: Date, default: Date.now },
});

// ✅ This prevents the overwrite error
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;

