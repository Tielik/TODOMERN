// server/src/controllers/todoController.ts

import type { Request, Response } from 'express';
import * as Todo from '../models/Todo.ts'; // Importujemy nasz model

// 1. Funkcja obsługująca żądanie POST (tworzenie nowego zadania)
export const createTodo = async (req: Request, res: Response) => {
    // 2. Pobieramy dane z ciała żądania (body)
    const { title, description, dueDate } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Tytul jest wymagany." });
    }

    try {
        // 3. Tworzymy nowy dokument na podstawie modelu Todo
        const newTodo = new Todo.default({
            title,
            description,
            dueDate
            // isCompleted zostanie ustawione na false (default)
        });

        // 4. Zapisujemy dokument w bazie danych MongoDB
        const savedTodo = await newTodo.save();

        // 5. Wysyłamy odpowiedź do klienta (status 201 - Created)
        res.status(201).json(savedTodo);
    } catch (error) {
        // Obsługa błędu serwera lub błędu walidacji
        //res.status(500).json({ message: "Nie udało się utworzyć zadania.", error: error.message });
    }
};
export const getAllTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.default.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Nie udało się pobrać zadań.", error: error.message });
    }
}
export const getTodoById = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.default.findById(req.params.id);
        if (todo === null) {
            return res.status(404).json({ message: "Nie znaleziono zadania." });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Nie udało się pobrać zadania.", error: error.message });
    }
}
// server/src/controllers/todoController.ts
// ... (inne importy i funkcje)

export const updateTodo = async (req: Request, res: Response) => {
    // 1. Pobieramy ID z parametrów URL (np. /api/todos/123)
    const { id } = req.params;
    // 2. Pobieramy dane do aktualizacji z ciała żądania (tytuł, opis, etc.)
    const updateData = req.body;

    try {
        // 3. Mongoose: Znajdujemy zadanie po ID i aktualizujemy je
        const updatedTodo = await Todo.default.findByIdAndUpdate(id, updateData, { new: true });
        // Opcja { new: true } jest kluczowa: mówi Mongoose, żeby zwróciło DOKUMENT PO AKTUALIZACJI, 
        // a nie przed nią.

        if (!updatedTodo) {
            // Jeśli Mongoose nie znajdzie pasującego ID, zwraca 404
            return res.status(404).json({ message: "Nie znaleziono zadania do aktualizacji. 🔍" });
        }

        // 4. Wysyłamy zaktualizowany dokument z powrotem do klienta
        res.status(200).json(updatedTodo);
    } catch (error) {
        // Błąd serwera (np. niepoprawny format ID lub błąd MongoDB)
        res.status(500).json({ message: "Nie udało się zaktualizować zadania. ❌", error: error.message });
    }
}
export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.default.findByIdAndDelete(req.params.id);
        if (todo === null) {
            return res.status(404).json({ message: "Nie znaleziono zadania." });
        }
        res.status(200).json({ message: "Zadanie zostało usunięte." });
    }
    catch (error) {
        res.status(500).json({ message: "Nie udało się usunąć zadania.", error: error.message });
    }
}