// client/src/components/TodoForm.tsx

import React, { useState } from 'react';
import { postTodo } from '../api/todoApi';
// Nazwa komponentu musi zaczynać się z dużej litery (TodoForm) ten ontodoadded to nazwa propsa i z app on da, zę coś dostanie
const TodoForm = ({ onTodoAdded }: { onTodoAdded: () => void }) => {
    const [titles, setTitle] = useState('');
    const [descriptions, setDescription] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newTodo = {
            title: titles,
            description: descriptions
        }
        if (!newTodo.title || !newTodo.description) {
            return
        }
        await postTodo(newTodo);
        if (onTodoAdded) {
            onTodoAdded();
        }


    }

    return (
        // Zwracamy podstawowy formularz
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="tytuł" id="title" onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder="opis" id="description" onChange={(e) => setDescription(e.target.value)} />
            <button >Dodaj</button>
        </form>
    );
}

// Musimy wyeksportować komponent, aby Apr.tsx mógł go zobaczyć
export default TodoForm;