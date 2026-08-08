// models/task.model.js
import db from "../db/connection.js";

export async function getAll() {
  const { rows } = await db.query("SELECT * FROM tasks");
  return rows;
}

export async function getById(id) {
  const { rows } = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
  return rows[0];
}

export async function create({ title }) {
  const { rows } = await db.query(
    "INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *",
    [title, false]
  );
  return rows[0];
}

export async function update(id, { title, done }) {
  const existing = await getById(id);
  if (!existing) return null;

  const newTitle = title !== undefined ? title : existing.title;
  const newDone = done !== undefined ? done : existing.done;

  const { rows } = await db.query(
    "UPDATE tasks SET title = $1, done = $2 WHERE id = $3 RETURNING *",
    [newTitle, newDone, id]
  );
  return rows[0];
}

export async function remove(id) {
  const { rowCount } = await db.query("DELETE FROM tasks WHERE id = $1", [id]);
  return rowCount > 0;
}

export async function reset() {
  await db.query("TRUNCATE tasks RESTART IDENTITY");
  await db.query(
    "INSERT INTO tasks (title, done) VALUES ($1, $2), ($3, $4), ($5, $6)",
    ["Buy milk", false, "Read chapter 3", true, "Write CRUD API", false]
  );
  return getAll();
}