// controllers/task.controller.js
import * as Task from "../models/task.model.js";

export function listTasks(req, res) {
  res.status(200).json(Task.getAll());
}

export function getTask(req, res) {
  const id = Number(req.params.id);
  const task = Task.getById(id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.status(200).json(task);
}