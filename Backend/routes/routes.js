import express from 'express';
import * as GameController from '../controllers/Games.js';

const router = express.Router();

router.get('/games', GameController.showAllGames);
router.get('/games/:id', GameController.showGameById);
router.post('/games', GameController.addGame);
router.put('/games/:id', GameController.modifyGame);
router.delete('/games/:id', GameController.removeGame);
router.get('/gamesLimited', GameController.ShowXGames);
router.get('/gamesCount', GameController.countGames);

export default router;