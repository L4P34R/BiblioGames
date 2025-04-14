import express from 'express';
import * as GameController from '../controllers/Games.js';
import * as UserController from '../controllers/Users.js';
import * as ReviewController from '../controllers/Reviews.js';

const router = express.Router();

router.get('/games', GameController.showAllGames);
router.get('/games/:id', GameController.showGameById);
router.post('/games', GameController.addGame);
router.put('/games/:id', GameController.modifyGame);
router.delete('/games/:id', GameController.removeGame);
router.get('/gamesLimited', GameController.ShowXGames);
router.get('/gamesCount', GameController.countGames);

router.post('/UserRegister', UserController.registerUser);
router.post('/Login', UserController.loginUser);
router.get('/Username/:Id', UserController.fetchUsernameById);

router.get('/latestReviews', ReviewController.getLatestReviews);
router.get('/reviews/:gameId', ReviewController.getReviewsByGameId);
router.post('/addReview', ReviewController.addReview);
router.put('/updateReview/:Id', ReviewController.updateReview);
router.delete('/deleteReview/:id', ReviewController.deleteReview);
router.get('/Average/:gameId', ReviewController.getAverageRatingByGameId);
router.get('/review/:ID', ReviewController.getReviewById);

export default router;