import { Router } from "express";
import register from "../controllers/auth/register";
import login from "../controllers/auth/login";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("This is authRouter");
});
authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;
