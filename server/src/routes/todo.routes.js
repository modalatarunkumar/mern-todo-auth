import { Router } from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { createTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from '../controllers/todo.controller.js';

const router = Router()

router.post("/", isLoggedIn, createTodo)
router.get("/", isLoggedIn, getTodos)
router.put("/:id", isLoggedIn, updateTodo);
router.delete("/:id", isLoggedIn, deleteTodo);
router.put("/toggle/:id", isLoggedIn, toggleTodo);


export default router;