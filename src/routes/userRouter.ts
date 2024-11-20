import express from "express";
import viewUsers from "../controllers/users/viewUsers";
import profile from "../controllers/users/profile";
import followUser from "../controllers/users/follow";
import unfollowUser from "../controllers/users/unfollow";
import searchUser from "../controllers/users/searchUser";

const userRouter = express.Router();

userRouter.get("/", viewUsers);
userRouter.get("/profile/:id", profile);
userRouter.post("/follow/:id", followUser);
userRouter.post("/unfollow/:id", unfollowUser);
userRouter.post("/search", searchUser);

export default userRouter;
