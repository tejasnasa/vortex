import express from "express";

const bookmarkRouter = express.Router();

bookmarkRouter.post("/post/:id");
bookmarkRouter.delete("/post/:id");
bookmarkRouter.get("/all");

export default bookmarkRouter;
