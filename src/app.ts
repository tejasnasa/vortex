import express from "express";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import masterRouter from "./routes/masterRouter";

config();

const app = express();
const prisma = new PrismaClient();

app.use("/v1", masterRouter);

app.use(async (req, res, next) => {
  try {
    await prisma.$connect();
    console.log("Connected to the database.");
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).send("Database connection error");
  }
});

export { app, prisma };