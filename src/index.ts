import express from "express";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

config();

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Unifyr");
});

const port = process.env.PORT;

prisma
  .$connect()
  .then(() => {
    console.log("Connected to the database.");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });
