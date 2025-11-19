import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { forgotPassword, getProfile, login, logout, resetPassword, signUp } from "../controllers/auth.controller.js";


const router = Router()

router.post("/signup", signUp);

router.post("/login", login);

router.get("/profile", isLoggedIn, getProfile);

router.get("/logout", isLoggedIn, logout);

router.post("/password/forgot", forgotPassword);

router.post("/password/reset/:token", resetPassword);

export default router;