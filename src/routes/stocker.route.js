import express from "express";
import { updateStock } from "../controllers/stocker.controller.js";
import auth from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/roles.middleware.js";

const router = express.Router();

router.patch("/:id", auth, authorizeRoles("stocker"), updateStock);

export default router;
