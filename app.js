// app.js
import express from "express";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import metaRoutes from "./routes/meta.routes.js";
import taskRoutes from "./routes/task.routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const openapiDocument = JSON.parse(readFileSync(join(__dirname, "openapi.json"), "utf-8"));

const app = express();
app.use(express.json());
app.use("/", metaRoutes);
app.use("/", taskRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

export default app;