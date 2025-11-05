import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { getProfile, login, logout, signUp } from "../controllers/auth.controller.js";


const router = Router()

router.post("/signup", signUp);

router.post("/login", login);

router.get("/profile", isLoggedIn, getProfile);

router.get("/logout", isLoggedIn, logout);


export default router;