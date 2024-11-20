import express from "express";
import register from "../controllers/auth/register";
import { login } from "../controllers/auth/login";
import googleLogin from "../controllers/auth/googleLogin";
import googleRegister from "../controllers/auth/googleRegister";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/googleLogin", googleLogin);
authRouter.post("/googleRegister", googleRegister);


export default authRouter;
