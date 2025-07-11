import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
  reorderLevel: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
