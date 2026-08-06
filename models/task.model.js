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