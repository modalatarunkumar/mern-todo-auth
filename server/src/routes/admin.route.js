import { Router } from "express";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";
import { adminDeleteTodo, getAllUsers, getAllUsersWithTodos } from "../controllers/admin.controller.js";

const router = Router()

router.get("/users", isLoggedIn, isAdmin, getAllUsers);
router.get("/users-todos", isLoggedIn, isAdmin, getAllUsersWithTodos);
router.delete("/delete/:id", isLoggedIn, isAdmin, adminDeleteTodo);

export default router;