import{
    getAllGames,
    getGameById,
    insertGame,
    updateGameById,
    deleteGameById
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