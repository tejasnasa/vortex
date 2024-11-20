import express from "express";
import editPassword from "../controllers/self/editPassword";
import getPersonalDetails from "../controllers/self/getPersonalDetails";
import editProfile from "../controllers/self/editProfile";

const selfRouter = express.Router();

selfRouter.get("/details", getPersonalDetails);
selfRouter.patch("/edit", editProfile);
selfRouter.post("/password", editPassword);

export default selfRouter;
