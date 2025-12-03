// client/src/App.tsx
import React, { useState, useEffect } from 'react';
import { getAllTodos } from './api/todoApi';
import TodoForm from './components/TodoForm';
function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getAllTodos();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  console.log("Pobrane zadania:", todos);

  return (
    <div className="container">
      <h1>Lista Zadań (To-Do App) 📝</h1>
      {/* Tutaj będziemy wyświetlać zadania */}
      <TodoForm />
      {todos.map((todo) => (
        <div key={todo._id}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <p>{todo.dueDate}</p>
          <p>{todo.isCompleted.toString()}</p>
        </div>
      ))}
    </div>
  );
}

export default App;