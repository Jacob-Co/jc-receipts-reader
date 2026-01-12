import healthRouter from "./router/health"
import receiptsRouter from "./router/receipts"
import tagsRouter from "./router/tags";
import categoriesRouter from "./router/categories";

import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}));
app.use("/health", healthRouter);
app.use("/receipts", receiptsRouter);
app.use("/categories", categoriesRouter);
app.use("/tags", tagsRouter);

export default app;
