import{
    getAllGames,
    getGameById,
    insertGame,
    updateGameById,
    deleteGameById,
    getXGames
}from "../models/GamesModel.js";

export const showAllGames = (req, res) => {
    getAllGames((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const showGameById = (req, res) => {
    getGameById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const addGame = (req, res) => {
    const data = req.body;
    insertGame(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const modifyGame = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateGameById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const removeGame = (req, res) => {
    deleteGameById(req.params.id, (err, results) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(results);
        }
    }
    );
};

export const ShowXGames = (req, res) => {
    // Convertir les paramètres en nombres
    const x = parseInt(req.query.x, 10) || 10; // Par défaut, 10 jeux par page
    const page = parseInt(req.query.page, 10) || 1; // Par défaut, page 1
    const sort = req.query.sort || 'id'; // Colonne de tri par défaut
    const order = req.query.order || 'ASC'; // Ordre de tri par défaut

    // Calculer l'offset
    const offset = (page - 1) * x;

    // Appeler la fonction du modèle
    getXGames(x, offset, sort, order, (err, results) => {
        if (err) {
            console.error('Erreur dans ShowXGames:', err);
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
};