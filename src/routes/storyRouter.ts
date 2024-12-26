import express from "express";
import createStory from "../controllers/story/createStory";
import getStories from "../controllers/story/getStories";
import storyDetails from "../controllers/story/storyDetails";
import deleteStory from "../controllers/story/deleteStory";
import getMyStories from "../controllers/story/getMyStories";

const storyRouter = express.Router();

storyRouter.get("/", getStories);
storyRouter.post("/create", createStory);
storyRouter.get("/details/:storyid", storyDetails);
storyRouter.delete("/delete/:storyid", deleteStory);
storyRouter.get("/viewMy", getMyStories);

export default storyRouter;
