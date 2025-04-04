import express from 'express';
import {
    showAllGames,
    showGameById,
    addGame,
    modifyGame,
    removeGame
} from '../controllers/Games.js';

const router = express.Router();

router.get('/games', showAllGames);
router.get('/games/:id', showGameById);
router.post('/games', addGame);
router.put('/games/:id', modifyGame);
router.delete('/games/:id', removeGame);

export default router;