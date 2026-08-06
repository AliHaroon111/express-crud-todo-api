// server.js
import app from "./app.js";
import "./db/connection.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Task API listening on http://localhost:${PORT}`);
});