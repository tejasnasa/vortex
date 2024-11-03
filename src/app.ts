import express from "express";
import { config } from "dotenv";
import masterRouter from "./routes/masterRouter";

const app = express();

config();

app.use("/v1", masterRouter);

export default app;
