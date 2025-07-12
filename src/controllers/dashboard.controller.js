import Alert from "../models/alert.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const products = await Product.find();
    const alerts = await Alert.find({ resolved: false });
    const categories = await Product.distinct("category");

    const totalProducts = products.length;
    const lowStock = products.filter(p => p.quantity < p.reorderLevel).length;

    const categoryStats = {};
    categories.forEach(category => {
      const items = products.filter(p => p.category === category);
      const low = items.filter(p => p.quantity < p.reorderLevel).length;
      const out = items.filter(p => p.quantity === 0).length;
      categoryStats[category] = {
        total: items.length,
        lowStock: low,
        outOfStock: out,
      };
    });

    res.json({
      totalProducts,
      lowStock,
      activeAlerts: alerts.length,
      categoryStats,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listStockers = async (req, res) => {
  try {
    const stockers = await User.find({ role: "stocker" });
    const products = await Product.find();

    const activeMap = new Map();
    products.forEach(p => {
      const daysAgo = (Date.now() - new Date(p.updatedAt)) / (1000 * 60 * 60 * 24);
      if (daysAgo < 7) {
        const id = p.createdBy?.toString();
        if (id) activeMap.set(id, true);
      }
    });

    const result = stockers.map(user => ({
      username: user.username,
      active: activeMap.has(user._id.toString()),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
