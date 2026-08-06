// models/task.model.js
import db from "../db/connection.js";

function toTask(row) {
  return { id: row.id, title: row.title, done: Boolean(row.done) };
}

export function getAll() {
  const rows = db.prepare("SELECT * FROM tasks").all();
  return rows.map(toTask);
}

export function getById(id) {
  const row = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  return row ? toTask(row) : undefined;
}

export function create({ title }) {
  const result = db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)").run(title, 0);
  return getById(result.lastInsertRowid);
}

export function update(id, { title, done }) {
  const existing = getById(id);
  if (!existing) return null;

  const newTitle = title !== undefined ? title : existing.title;
  const newDone = done !== undefined ? done : existing.done;

  db.prepare("UPDATE tasks SET title = ?, done = ? WHERE id = ?").run(newTitle, newDone ? 1 : 0, id);
  return getById(id);
}

export function remove(id) {
  const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
  return result.changes > 0;
}