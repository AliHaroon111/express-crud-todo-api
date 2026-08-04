// routes/meta.routes.js
import express from "express";
import { getRoot, getHealth } from "../controllers/meta.controller.js";

const router = express.Router();

router.get("/", getRoot);
router.get("/health", getHealth);

export default router;