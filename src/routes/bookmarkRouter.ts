import express from "express";
import bookmarkPost from "../controllers/bookmark/bookmarkPost";
import unbookmarkPost from "../controllers/bookmark/unbookmarkPost";
import viewBookmarks from "../controllers/bookmark/viewBookmarks";

const bookmarkRouter = express.Router();

bookmarkRouter.post("/post/:postid", bookmarkPost);
bookmarkRouter.delete("/post/:postid", unbookmarkPost);
bookmarkRouter.get("/", viewBookmarks);

export default bookmarkRouter; 
