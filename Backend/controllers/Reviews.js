import * as ReviewModel from '../models/ReviewsModel.js';

export const getLatestReviews = (req, res) => {
    console.log("Appel de getLatestReviews");
    const limit = parseInt(req.query.limit) || 10;
    ReviewModel.getLatestReviews(limit, (err, results) => {
        if (err) {
            console.error('Erreur dans getLatestReviews:', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            console.log('Derniers avis récupérées avec succès dans getLatestReviews');
            res.status(200).json(results);
        }
    });
};

export const getReviewsByGameId = (req, res) => {
    console.log("Appel de getReviewsByGameId");
    const gameId = req.params.gameId;
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    ReviewModel.getReviewsByGameId(gameId, limit, offset, (err, results) => {
        if (err) {
            console.error('Erreur dans getReviewsByGameId:', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            console.log('Avis récupérées avec succès dans getReviewsByGameId');
            res.status(200).json(results);
        }
    });
};

export const addReview = (req, res) => {
    console.log("Appel de addReview");
    const data = req.body;

    ReviewModel.addReview(data, (err, results) => {
        if (err) {
            console.error('Erreur dans addReview:', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            console.log('Avis ajouté avec succès dans addReview');
            res.status(200).json(results);
        }
    });
};

export const updateReview = (req, res) => {
    console.log("Appel de updateReview");
    const data = req.body;

    ReviewModel.updateReview(data, (err, results) => {
        if (err) {
            console.error('Erreur dans updateReview:', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            console.log('Avis mis à jour avec succès dans updateReview');
            res.status(200).json(results);
        }
    });
};

export const deleteReview = (req, res) => {
    console.log("Appel de deleteReview");
    const reviewId = req.params.reviewId;

    ReviewModel.deleteReview(reviewId, (err, results) => {
        if (err) {
            console.error('Erreur dans deleteReview:', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            console.log('Avis supprimé avec succès dans deleteReview');
            res.status(200).json(results);
        }
    });
};

export const getAverageRatingByGameId = (req, res) => {
    console.log("Appel de getAverageRatingByGameId");
    const gameId = req.params.gameId;

    ReviewModel.getAverageRatingByGameId(gameId, (err, results) => {
        if (err) {
            console.error('Erreur dans getAverageRatingByGameId:', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            console.log('Note moyenne récupérée avec succès dans getAverageRatingByGameId');
            res.status(200).json(results);
        }
    });
}

export const getReviewById = (req, res) => {
    console.log("Appel de getReviewById");
    const reviewId = req.params.reviewId;

    ReviewModel.getReviewById(reviewId, (err, results) => {
        if (err) {
            console.error('Erreur dans getReviewById:', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            console.log('Avis récupéré avec succès dans getReviewById');
            res.status(200).json(results);
        }
    });
};