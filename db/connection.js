// db/connection.js
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

await pool.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT false
  )
`);

const { rows } = await pool.query("SELECT COUNT(*) AS count FROM tasks");
if (Number(rows[0].count) === 0) {
  await pool.query(
    "INSERT INTO tasks (title, done) VALUES ($1, $2), ($3, $4), ($5, $6)",
    ["Buy milk", false, "Read chapter 3", true, "Write CRUD API", false]
  );
}

export default pool;