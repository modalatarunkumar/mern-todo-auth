import { Router } from "express";
import authRoutes from "./auth.route.js";
import todoRoutes from "./todo.routes.js";
import adminRoutes from "./admin.route.js";


const router = Router()

router.use("/auth", authRoutes)
router.use("/todo", todoRoutes)
router.use("/admin", adminRoutes)


export default router;