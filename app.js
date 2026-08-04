// app.js
import express from "express";
import metaRoutes from "./routes/meta.routes.js";

const app = express();
app.use(express.json());
app.use("/", metaRoutes);

export default app;