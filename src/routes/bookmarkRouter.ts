import express from "express";
import bookmarkPost from "../controllers/bookmark/bookmarkPost";
import unbookmarkPost from "../controllers/bookmark/unbookmarkPost";
import viewBookmarks from "../controllers/bookmark/viewBookmarks";

const bookmarkRouter = express.Router();

bookmarkRouter.post("/post/:id", bookmarkPost);
bookmarkRouter.delete("/post/:id", unbookmarkPost);
bookmarkRouter.get("/all", viewBookmarks);

export default bookmarkRouter; 
