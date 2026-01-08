import { Router } from "express";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";
import { adminDeleteTodo, getAllUsers, getAllUsersWithTodos, getAUserTodos } from "../controllers/admin.controller.js";

const router = Router()

router.get("/users", isLoggedIn, isAdmin, getAllUsers);
router.get("/users-todos", isLoggedIn, isAdmin, getAllUsersWithTodos);
router.get("/user/:id/todos", isLoggedIn, isAdmin, getAUserTodos);
router.delete("/delete/:id", isLoggedIn, isAdmin, adminDeleteTodo);

export default router;