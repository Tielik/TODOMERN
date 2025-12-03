// client/src/components/TodoForm.tsx

import React, { useState } from 'react';
import { postTodo } from '../api/todoApi';
// Nazwa komponentu musi zaczynać się z dużej litery (TodoForm)
function TodoForm() {
    const [titles, setTitle] = useState(String);
    const [descriptions, setDescription] = useState(String);
    function FormTodo(e) {
        e.preventDefault()
        const json = '{"title":"' + titles + '","description":"' + descriptions + `"}`;
        const x = JSON.parse(json)
        console.log(x)
        postTodo(x);

    }

    return (
        // Zwracamy podstawowy formularz
        <form>
            <input type="text" placeholder="tytuł" id="title" onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="opis" id="description" onChange={(e) => setDescription(e.target.value)} />
            <button onClick={FormTodo}>Dodaj</button>
        </form>
    );
}

// Musimy wyeksportować komponent, aby App.tsx mógł go zobaczyć
export default TodoForm;