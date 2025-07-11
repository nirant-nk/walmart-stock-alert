import Alert from "../models/alert.model.js";
import Product from "../models/product.model.js";

export const updateStock = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { quantity } },
      { new: true }
    );

    if (product.quantity < product.reorderLevel) {
      await Alert.create({ product: product._id });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
