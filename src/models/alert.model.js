import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  triggeredAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

export default mongoose.model("Alert", alertSchema);
