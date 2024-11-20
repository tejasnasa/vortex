import express from "express";
import editPassword from "../controllers/self/editPassword";
import getPersonalDetails from "../controllers/self/getPersonalDetails";

const selfRouter = express.Router();

selfRouter.get("/self", getPersonalDetails);
selfRouter.patch("/editProfile");
selfRouter.post("/password", editPassword);

export default selfRouter;
