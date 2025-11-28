import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, ref: "User" },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" }, // ← Changed to ObjectId
        quantity: { type: Number, required: true },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Address" }, // ← Changed to ObjectId
    status: { type: String, default: "Order Placed" },
    date: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;

