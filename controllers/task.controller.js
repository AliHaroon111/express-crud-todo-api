// controllers/task.controller.js
import * as Task from "../models/task.model.js";

function isValidTitle(title) {
  return typeof title === "string" && title.trim().length > 0;
}

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

export function createTask(req, res) {
  const { title } = req.body || {};

  if (!isValidTitle(title)) {
    return res.status(400).json({ error: "title is required and must be a non-empty string" });
  }

  const newTask = Task.create({ title: title.trim() });
  res.status(201).json(newTask);
}

export function updateTask(req, res) {
  const id = Number(req.params.id);
  const { title, done } = req.body || {};

  if (title === undefined && done === undefined) {
    return res.status(400).json({ error: "provide at least one of: title, done" });
  }

  if (title !== undefined && !isValidTitle(title)) {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }

  if (done !== undefined && typeof done !== "boolean") {
    return res.status(400).json({ error: "done must be a boolean" });
  }

  const updated = Task.update(id, {
    title: title !== undefined ? title.trim() : undefined,
    done,
  });

  if (!updated) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.status(200).json(updated);
}

export function deleteTask(req, res) {
  const id = Number(req.params.id);
  const removed = Task.remove(id);

  if (!removed) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.status(204).send();
}