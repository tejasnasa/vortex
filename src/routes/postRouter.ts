import express from "express";
import createPost from "../controllers/post/createPost";
import postDetails from "../controllers/post/postDetails";
import viewAllPosts from "../controllers/post/viewAllPosts";
import deletePost from "../controllers/post/deletePost";

const postRouter = express.Router();

postRouter.get("/", viewAllPosts);
postRouter.post("/", createPost);
postRouter.get("/:id", postDetails);
postRouter.patch("/:id");
postRouter.delete("/:id", deletePost);

export default postRouter;
