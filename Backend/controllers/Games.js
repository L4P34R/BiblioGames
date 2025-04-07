import * as GameModel from "../models/GamesModel.js";

export const showAllGames = (req, res) => {
    console.log("Appel de showAllGames");
    GameModel.getAllGames((err, results) => {
        if (err) {
            console.error('Erreur dans showAllGames:', err);
            res.status(500).json({ error: err });
        } else if (!results) {
            console.log('Aucun jeu trouvé dans showAllGames');
            res.status(404).json({ error: 'No games found' });
        } else {
            console.log('Jeux récupérés avec succès dans showAllGames');
            res.status(200).json(results);
        }
    });
};

export const showGameById = (req, res) => {
    console.log("Appel de showGameById");
    GameModel.getGameById(req.params.id, (err, results) => {
        if (err) {
            console.error('Erreur dans showGameById:', err);
            res.status(500).json({ error: err });
        } else if (results.length === 0) {
            console.log('Jeu non trouvé dans showGameById');
            res.status(404).json({ error: 'Game not found' });
        } else {
            console.log('Jeu récupéré avec succès dans showGameById');
            res.status(200).json(results);
        }
    });
};

export const addGame = (req, res) => {
    console.log("Appel de addGame");
    const data = req.body;
    GameModel.insertGame(data, (err, results) => {
        if (err) {
            console.error('Erreur dans addGame:', err);
            res.status(500).json({ error: err });
        } else {
            console.log('Jeu ajouté avec succès dans addGame');
            res.status(200).json(results);
        }
    });
};

export const modifyGame = (req, res) => {
    console.log("Appel de modifyGame");
    const data = req.body;
    const id = req.params.id;
    GameModel.updateGameById(data, id, (err, results) => {
        if (err) {
            console.error('Erreur dans modifyGame:', err);
            res.status(500).json({ error: err });
        } else {
            console.log('Jeu modifié avec succès dans modifyGame');
            res.status(200).json(results);
        }
    });
};

export const removeGame = (req, res) => {
    console.log("Appel de removeGame");
    GameModel.deleteGameById(req.params.id, (err, results) => {
        if (err) {
            console.error('Erreur dans removeGame:', err);
            res.status(500).json({ error: err });
        } else {
            console.log('Jeu supprimé avec succès dans removeGame');
            res.status(200).json(results);
        }
    });
};

export const ShowXGames = (req, res) => {
    console.log("Appel de ShowXGames");
    const x = parseInt(req.query.x, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const sort = req.query.sort || 'id';
    const order = req.query.order || 'ASC';

    const offset = (page - 1) * x;

    GameModel.getXGames(x, offset, sort, order, (err, results) => {
        if (err) {
            console.error('Erreur dans ShowXGames:', err);
            res.status(500).json({ error: err });
        } else {
            console.log('Jeux récupérés avec succès dans ShowXGames');
            res.status(200).json(results);
        }
    });
};

export const countGames = (req, res) => {
    console.log("Appel de countGames");
    GameModel.getNbGames((err, result) => {
        if (err) {
            console.error('Erreur dans countGames:', err);
            res.status(500).json({ error: err });
        } else {
            console.log('Nombre de jeux récupéré avec succès dans countGames');
            res.status(200).json(result);
        }
    });
};