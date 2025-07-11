import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "username");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
