import { Schema, model } from 'mongoose';
//1, definicja interfejsu (tp)
//mongoose będzie dbał o wartości, ale ten interfejs dba o typ w kodzie ts.
interface ITodo {
    title: string;
    description: string;
    dueDate?: Date;//? oznacza, że pole jest opcjonalne
    isCompleted: boolean;
}
//2. definicja schematu
const todoSchema = new Schema<ITodo>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: { type: String, required: false },
    dueDate: { type: Date, required: false },
    isCompleted: { type: Boolean, default: false },

},
    { timestamps: true }); //zapisywanie czasu utworzenia i edycji
//3. zdefiniowanie modelu
const Todo = model<ITodo>('Todo', todoSchema);
export default Todo;