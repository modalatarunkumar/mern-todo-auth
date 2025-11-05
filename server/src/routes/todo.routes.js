import { Router } from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { getATodo, createTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from '../controllers/todo.controller.js';

const router = Router()

router.post("/", isLoggedIn, createTodo)
router.get("/", isLoggedIn, getTodos)
router.put("/:id", isLoggedIn, updateTodo);
router.delete("/:id", isLoggedIn, deleteTodo);
router.put("/toggle/:id", isLoggedIn, toggleTodo);
router.get("/:id", isLoggedIn, getATodo)


export default router;