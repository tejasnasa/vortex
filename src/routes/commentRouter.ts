import express from "express";
import viewComments from "../controllers/comment/viewComments";
import deleteComment from "../controllers/comment/deleteComment";
import createComment from "../controllers/comment/createComment";

const commentRouter = express.Router();

commentRouter.post("/post/:postid", createComment);
commentRouter.delete("/post/:commid", deleteComment);
commentRouter.get("/", viewComments);

export default commentRouter;
