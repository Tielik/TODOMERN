// client/src/api/todoApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/todos';

export const getAllTodos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Błąd podczas pobierania zadań:", error);
        return [];
    }
};
export const postTodo = async (todo: any) => {
    try {
        const response = await axios.post(API_URL, todo);
        return response.data;
    } catch (error) {
        console.error("Błąd podczas tworzenia zadania:", error);
        return null;
    }
};