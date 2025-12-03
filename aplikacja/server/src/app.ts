import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // 👈 1. Importujemy cors

// routery
import todoRouters from './routes/todoRoutes.ts';

const app = express();
const PORT = 3000;
// Middleware:
app.use(express.json());
app.use(cors()); //2. Aktywujemy cors dla wszystkich źródeł
// Teraz serwer doda nagłówek 'Access-Control-Allow-Origin: *'
// (lub podobny), który odblokuje komunikację z Reactem (5173).

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.send('Aplikacja Backend działa!');
    console.log('Aplikacja Backend działa!');
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Połączono z bazą danych MongoDB');
    } catch (error) {
        console.error('Błąd połączenia z bazą danych MongoDB:', error);
        process.exit(1);
    }
};
console.log('Sprawdzana wartość MONGO_URI:', process.env.MONGO_URI);
connectDB();

app.use("/api/todos", todoRouters);

app.listen(PORT, () => {
    console.log(`Serwer nasłuchuje na porcie ${PORT}`);
    console.log(`Lokalizacja: http://localhost:${PORT}`);
});