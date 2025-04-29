import express from 'express';
import * as GameController from '../controllers/Games.js';
import * as UserController from '../controllers/Users.js';
import * as ReviewController from '../controllers/Reviews.js';

const router = express.Router();

// Routes pour les jeux
router.get('/games', GameController.showAllGames);
router.get('/games/:id', GameController.showGameById);
router.post('/games', GameController.addGame);
router.put('/games/:id', GameController.modifyGame);
router.delete('/games/:id', GameController.removeGame);
router.get('/gamesLimited', GameController.ShowXGames);
router.get('/gamesCount', GameController.countGames);

// Routes pour les informations relationnelles d'un jeu
router.get('/games/:id/categories', GameController.showCategoriesByGameId);
router.get('/games/:id/families', GameController.showFamiliesByGameId);
router.get('/games/:id/mechanics', GameController.showMechanicsByGameId);
router.get('/games/:id/designers', GameController.showDesignersByGameId);
router.get('/games/:id/artists', GameController.showArtistsByGameId);
router.get('/games/:id/publishers', GameController.showPublishersByGameId);
router.get('/games/:id/implementations', GameController.showImplementationsByGameId);
router.get('/games/:id/expansions', GameController.showExpansionsByGameId);

// Routes pour les utilisateurs
router.post('/UserRegister', UserController.registerUser);
router.post('/Login', UserController.loginUser);
router.get('/Username/:Id', UserController.fetchUsernameById);

// Routes pour les avis
router.get('/latestReviews', ReviewController.getLatestReviews);
router.get('/reviews/:gameId', ReviewController.getReviewsByGameId);
router.post('/Review', ReviewController.addReview);
router.put('/updateReview/:Id', ReviewController.updateReview);
router.delete('/deleteReview/:id', ReviewController.deleteReview);
router.get('/Average/:gameId', ReviewController.getAverageRatingByGameId);
router.get('/review/:ID', ReviewController.getReviewById);

export default router;