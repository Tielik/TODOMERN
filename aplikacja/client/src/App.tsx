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
      <h1 >Lista Zadań (To-Do App) 📝</h1>
      {/*te ontoadded to props który  */}
      <h1><TodoForm onTodoAdded={fetchTodos} /> </h1>
      {/*jest to poto że jak konponent odpali intododeleted to on odpali fetch todos resetuje uwu */}
      <table>
        <tr>
          <th>Nie wykonane Zadania</th>
          <th>Wykonane Zadania</th>
        </tr>
        <tr>
          <td><TodoItem todos={todos} onTodoDeleted={fetchTodos} filter={false} /> </td>
          <td><TodoItem todos={todos} onTodoDeleted={fetchTodos} filter={true} /> </td>
        </tr>
      </table>

    </div>
  );
}

export default App;