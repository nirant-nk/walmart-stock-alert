import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import stockerRoutes from "./routes/stocker.route.js";
dotenv.config({ debug: true,quiet: true  });

const app = express();

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock", stockerRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Stock Alert API Running...</h1>");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
