// client/src/App.tsx
import React, { useState, useEffect } from 'react';
import { getAllTodos } from './api/todoApi';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const data = await getAllTodos();
    setTodos(data);
  };
  // odpali sie przy uruchomieniu apki
  useEffect(() => {
    fetchTodos();
  }, []);

  console.log("Pobrane zadania:", todos);

  return (
    <div className="container">
      <h1>Lista Zadań (To-Do App) 📝</h1>
      {/*te ontoadded to props który  */}
      <TodoForm onTodoAdded={fetchTodos} />
      {/*jest to poto że jak konponent odpali intododeleted to on odpali fetch todos resetuje uwu */}
      <TodoItem todos={todos} onTodoDeleted={fetchTodos} />

    </div>
  );
}

export default App;