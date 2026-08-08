import * as Task from "../models/task.model.js";

export async function listTasks(req, res) {
  const tasks = await Task.getAll();
  res.status(200).json(tasks);
}

export async function getTask(req, res) {
  const id = Number(req.params.id);
  const task = await Task.getById(id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.status(200).json(task);
}

export async function createTask(req, res) {
  const { title } = req.body || {};

  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "title is required and must be a non-empty string" });
  }

  const newTask = await Task.create({ title: title.trim() });
  res.status(201).json(newTask);
}

export async function updateTask(req, res) {
  const id = Number(req.params.id);
  const { title, done } = req.body || {};

  if (title === undefined && done === undefined) {
    return res.status(400).json({ error: "provide at least one of: title, done" });
  }

  if (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }

  if (done !== undefined && typeof done !== "boolean") {
    return res.status(400).json({ error: "done must be a boolean" });
  }

  const updated = await Task.update(id, {
    title: title !== undefined ? title.trim() : undefined,
    done,
  });

  if (!updated) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.status(200).json(updated);
}

export async function deleteTask(req, res) {
  const id = Number(req.params.id);
  const removed = await Task.remove(id);

  if (!removed) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.status(204).send();
}

export async function getStats(req, res) {
  const all = await Task.getAll();
  const done = all.filter((t) => t.done).length;

  res.status(200).json({
    total: all.length,
    done,
    open: all.length - done,
  });
}

export async function resetTasks(req, res) {
  const tasks = await Task.reset();
  res.status(200).json({ message: "Tasks reset to seed data", tasks });
}