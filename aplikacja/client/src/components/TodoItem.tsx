import React from "react";
import { deleteTodo, updateTodo } from "../api/todoApi";


interface Todo {
    _id: string;
    title: string;
    description: string;
    dueDate?: string;
    updatedAt: string;
    createdAt: string;
    isCompleted: boolean;
}
//nazwa musi się zgadzać! tutaj musi byc dosłowna ta sama
const TodoItem = ({ todos, onTodoDeleted, filter }: { todos: Todo[], onTodoDeleted: () => void, filter: boolean }) => {
    const [isEditing, setIsEditing] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    async function handleEditingStart(id: string) {
        // 1. Znajdujemy zadanie do edycji w przekazanej tablicy propsów 'todos'
        const todoToEdit = todos.find(t => t._id === id);

        if (todoToEdit) {
            // 2. Musimy ustawić stany formularza na istniejące wartości ZANIM włączymy edycję
            setTitle(todoToEdit.title);
            setDescription(todoToEdit.description);
        }

        // 3. Włączamy tryb edycji
        setIsEditing(id);
    };


    async function handleDelete(id: string) {
        await deleteTodo(id);
        onTodoDeleted();
    }
    async function handleEditing(id: string) {
        const updatedData = {
            title: title,
            description: description
        }
        await updateTodo(id, updatedData);
        setIsEditing('');
        onTodoDeleted(); //ta nazwa jest ale tu chodzi by apap złapał polecenie resetu

    }
    async function handleCompletedState(id: string, isCompleted: boolean) {
        const newCompletedState = !isCompleted;

        // Ustawienie completedAt na aktualny czas, TYLKO jeśli zadanie jest NOWO ukończone
        const completedAtValue = newCompletedState ? new Date().toISOString() : null;

        const updatedData = {
            isCompleted: newCompletedState,
            completedAt: completedAtValue
        };

        await updateTodo(id, updatedData);
        onTodoDeleted(); //ta nazwa jest ale tu chodzi by apap złapał polecenie resetu
    };

    return (
        <ul>
            {todos.map((todo) => {
                const isCurrentEditing = isEditing === todo._id;
                let durationString = '';

                // NOWY WARUNEK: Obliczamy czas TYLKO, jeśli zadanie jest ukończone
                if (todo.isCompleted) {
                    // 1. Konwersja stringów ISO na obiekty Date
                    const startDate = new Date(todo.createdAt);
                    const endDate = new Date(todo.updatedAt);
                    console.log(startDate, endDate)

                    // 2. Obliczamy różnicę w milisekundach
                    const timeDifferenceMs = endDate.getTime() - startDate.getTime();

                    // 3. Obliczenia godzin i minut
                    // Zakładamy, że timeDifferenceMs jest już obliczone
                    const MS_IN_DAY = 1000 * 60 * 60 * 24;
                    const MS_IN_HOUR = 1000 * 60 * 60;
                    const MS_IN_MINUTE = 1000 * 60;

                    // 1. Obliczamy pełne dni (zaokrąglenie w dół)
                    const totalDays = Math.floor(timeDifferenceMs / MS_IN_DAY);

                    // 2. Obliczamy resztę milisekund, które NIE zmieściły się w pełnych dniach
                    const remainderMsAfterDays = timeDifferenceMs % MS_IN_DAY;

                    // 3. Obliczamy godziny, używając TYLKO reszty po dniach
                    const totalHours = Math.floor(remainderMsAfterDays / MS_IN_HOUR);

                    // 4. Obliczamy resztę milisekund, które pozostały po pełnych godzinach
                    const remainderMsAfterHours = remainderMsAfterDays % MS_IN_HOUR;

                    // 5. Obliczamy pozostałe minuty
                    const remainingMinutes = Math.floor(remainderMsAfterHours / MS_IN_MINUTE);
                    // 4. Formatowanie stringa (używamy godzin i minut)
                    // Tworzymy tablicę części, które nie są zerowe
                    const parts = [];
                    if (totalDays > 0) {
                        parts.push(`${totalDays}d`);
                    }
                    // Godziny i minuty zawsze wyświetlamy, chyba że wszystko jest zerowe
                    parts.push(`${totalHours}h`);
                    parts.push(`${remainingMinutes}m`);

                    durationString = `Zajęło: ${parts.join(' i ')}`;
                } else {
                    durationString = `Nie wykonany`;
                }

                if (todo.isCompleted === filter) {
                    return (
                        <li key={todo._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
                            {isCurrentEditing ? ( //edycja włączona
                                <>
                                    <input type="text" defaultValue={todo.title} onChange={(e) => setTitle(e.target.value)} />
                                    <input type="text" defaultValue={todo.description} onChange={(e) => setDescription(e.target.value)} />
                                    <button onClick={() => setIsEditing('')}>anulluj</button>
                                    <button onClick={() => handleEditing(todo._id)} >zapisz</button>

                                </>
                            ) : (
                                <>
                                    <h2>{todo.title}</h2>
                                    <p>{todo.description}</p>
                                    <p>Termin wykonania: {durationString}</p>
                                    <p>Ukończone: {todo.isCompleted.toString()}</p>

                                    {/* Przyciski Edytuj/Usuń - pokazujemy je tylko w trybie wyświetlania */}
                                    <button onClick={() => handleDelete(todo._id)}>Usuń</button>
                                    <button onClick={() => handleEditingStart(todo._id)}>Edytuj</button>
                                    {!todo.isCompleted && (
                                        <button onClick={() => handleCompletedState(todo._id, todo.isCompleted)}>Wykonane</button>
                                    )}
                                </>
                            )
                            }
                        </li>
                    )
                }
            })}
        </ul>
    );
};

export default TodoItem;