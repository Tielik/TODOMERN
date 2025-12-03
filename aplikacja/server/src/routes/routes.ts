import express from 'express';

// 1. Tworzymy obiekt Router
const router = express.Router();

// 2. Definiujemy trasę GET w tym routerze
router.get('/hello', (req, res) => {
    // Endpoint API będzie teraz dostępny pod adresem /api/test/hello
    res.status(200).json({
        message: 'Hello z wydzielonej trasy! Serwer działa poprawnie.',
        data: { time: new Date().toISOString() }
    });
});

// 3. Eksportujemy ten router, aby móc go użyć w app.ts
export default router;