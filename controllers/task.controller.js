// controllers/task.controller.js
import * as Task from "../models/task.model.js";

function isValidTitle(title) {
  return typeof title === "string" && title.trim().length > 0;
}

export function listTasks(req, res) {
  let result = Task.getAll();

  const { done, search, limit, offset } = req.query;

  if (done !== undefined) {
    const wantDone = done === "true";
    result = result.filter((t) => t.done === wantDone);
  }

  if (search) {
    const term = String(search).toLowerCase();
    result = result.filter((t) => t.title.toLowerCase().includes(term));
  }

  if (offset !== undefined || limit !== undefined) {
    const start = Number(offset) || 0;
    const end = limit !== undefined ? start + Number(limit) : undefined;
    result = result.slice(start, end);
  }

  res.status(200).json(result);
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

export function getStats(req, res) {
  const all = Task.getAll();
  const done = all.filter((t) => t.done).length;

  res.status(200).json({
    total: all.length,
    done,
    open: all.length - done,
  });
}

export function resetTasks(req, res) {
  const tasks = Task.reset();
  res.status(200).json({ message: "Tasks reset to seed data", tasks });
}