import express from "express";
import register from "../controllers/auth/register";
import login from "../controllers/auth/login";
import googleLogin from "../controllers/auth/googleLogin";
import googleRegister from "../controllers/auth/googleRegister";
import validateLogin from "../validations/validateLogin";
import validateRegister from "../validations/validateRegister";
import validateGoogleLogin from "../validations/validateGoogleLogin";
import validateGoogleRegister from "../validations/validateGoogleRegister";

const authRouter = express.Router();

authRouter.post("/login", validateLogin, login);
authRouter.post("/register", validateRegister, register);
authRouter.post("/googleLogin", validateGoogleLogin, googleLogin);
authRouter.post("/googleRegister", validateGoogleRegister, googleRegister);

export default authRouter;
