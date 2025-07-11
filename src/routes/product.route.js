import express from "express";
import { createProduct, getAllProducts } from "../controllers/inventory.controller.js";
import auth from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/roles.middleware.js";

const router = express.Router();

router.post("/", auth, authorizeRoles("admin"), createProduct);
router.get("/", auth, getAllProducts);

export default router;
