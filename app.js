// app.js
import express from "express";
import metaRoutes from "./routes/meta.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();
app.use(express.json());
app.use("/", metaRoutes);
app.use("/", taskRoutes);

export default app;