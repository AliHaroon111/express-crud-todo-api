// routes/task.routes.js
import express from "express";
import { listTasks, getTask } from "../controllers/task.controller.js";

const router = express.Router();

router.get("/tasks", listTasks);
router.get("/tasks/:id", getTask);

export default router;