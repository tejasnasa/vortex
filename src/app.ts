import express from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import masterRouter from "./routes/masterRouter";

config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/v1", masterRouter);

app.get("/", (req, res) => {
  res.send("Social Media API v1");
});

export default app;
