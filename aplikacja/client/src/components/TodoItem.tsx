import React from "react";
import { deleteTodo } from "../api/todoApi";


interface Todo {
    _id: string;
    title: string;
    description: string;
    dueDate?: string; // pole opcjonalne
    isCompleted: boolean;
}
//nazwa musi się zgadzać! tutaj musi byc dosłowna ta sama
const TodoItem = ({ todos, onTodoDeleted }: { todos: Todo[], onTodoDeleted: () => void }) => {
    const [isEditing, setIsEditing] = React.useState('');

    async function handleEditingStart(id: string) {
        setIsEditing(id);
    };

    async function handleDelete(id: string) {
        await deleteTodo(id);
        onTodoDeleted();
    }

    return (
        <ul>
            {todos.map((todo) => (
                // Zmieniamy <div> na <li> dla semantyki
                <li key={todo._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>

                    <h2>{todo.title}</h2>
                    <p>{todo.description}</p>
                    <p>Termin: {todo.dueDate}</p>
                    <p>Ukończone: {todo.isCompleted.toString()}</p>
                    <button onClick={() => handleDelete(todo._id)}>Usun</button>
                    <button onClick={() => handleEditingStart(todo._id)}>Edytuj</button>

                </li>
            ))}
        </ul>
    );
};

export default TodoItem;