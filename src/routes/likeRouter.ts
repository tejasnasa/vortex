import express from "express";
import likePost from "../controllers/like/likePost";
import unlikePost from "../controllers/like/unlikePost";
import likeComment from "../controllers/like/likeComment";
import unlikeComment from "../controllers/like/unlikeComment";
import viewPostLikes from "../controllers/like/viewPostLikes";
import viewCommentLikes from "../controllers/like/viewCommentLikes";

const likeRouter = express.Router();

likeRouter.post("/post/:postid", likePost);
likeRouter.delete("/post/:postid", unlikePost);
likeRouter.get("/posts", viewPostLikes)
likeRouter.post("/comment/:commid", likeComment)
likeRouter.delete("/comment/:commid", unlikeComment)
likeRouter.get("/comments", viewCommentLikes)

export default likeRouter;
