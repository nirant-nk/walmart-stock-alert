import express from "express";
import { getDashboardStats, listStockers } from "../controllers/dashboard.controller.js";
import auth from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/roles.middleware.js";

const router = express.Router();

router.get("/stats", auth, authorizeRoles("admin"), getDashboardStats);
router.get("/stockers", auth, authorizeRoles("admin"), listStockers);

export default router;
