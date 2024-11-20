import express from "express";
import createPost from "../controllers/post/createPost";
import deletePost from "../controllers/post/deletePost";
import editPost from "../controllers/post/editPost";
import postDetails from "../controllers/post/postDetails";
import viewMyPosts from "../controllers/post/viewMyPosts";
import viewTrendingPosts from "../controllers/post/viewTrendingPosts";

const postRouter = express.Router();

postRouter.get("/viewMy", viewMyPosts);
postRouter.get("/viewTrending", viewTrendingPosts);
postRouter.post("/create", createPost);
postRouter.get("/post/:postid", postDetails);
postRouter.patch("/modify/:postid", editPost);
postRouter.delete("/delete/:postid", deletePost);

export default postRouter;
