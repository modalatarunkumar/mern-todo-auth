import { Router } from "express";
import authRoutes from "./auth.route.js";
import todoRoutes from "./todo.routes.js";


const router = Router()

router.use("/auth", authRoutes)
router.use("/todo", todoRoutes)


export default router;