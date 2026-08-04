// routes/task.routes.js
import express from "express";
import { listTasks, getTask, createTask } from "../controllers/task.controller.js";

const router = express.Router();

router.get("/tasks", listTasks);
router.get("/tasks/:id", getTask);
router.post("/tasks", createTask);

export default router;