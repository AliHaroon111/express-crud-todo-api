// routes/task.routes.js
import express from "express";
import { listTasks, getTask, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";

const router = express.Router();

router.get("/tasks", listTasks);
router.get("/tasks/:id", getTask);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;