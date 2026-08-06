// db/connection.js
import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, "..", "tasks.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )
`);

const row = db.prepare("SELECT COUNT(*) AS count FROM tasks").get();
if (row.count === 0) {
  const seed = db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)");
  seed.run("Buy milk", 0);
  seed.run("Read chapter 3", 1);
  seed.run("Write CRUD API", 0);
}

export default db;