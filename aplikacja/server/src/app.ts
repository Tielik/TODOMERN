import express from 'express';
import type { Request, Response } from 'express';

// routery
import testRouter from './routes/routes.ts';

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Aplikacja Backend działa!');
});

app.use('/api/test', testRouter);

app.listen(PORT, () => {
    console.log(`Serwer nasłuchuje na porcie ${PORT}`);
    console.log(`Lokalizacja: http://localhost:${PORT}`);
});