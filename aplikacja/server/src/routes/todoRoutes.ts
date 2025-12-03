
import express from 'express';
import { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo } from '../controllers/todoController.ts'; // Importujemy funkcję

const router = express.Router();

// Definicja trasy POST: gdy dostaniemy POST na ścieżce głównej /,
// uruchamiamy funkcję createTodo
router.post('/', createTodo);
router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
export default router;