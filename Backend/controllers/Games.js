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
    const id = req.params.id;
    console.log("Appel de showGameById", id);
    GameModel.getGameById(id, (err, results) => {
        if (err) {
            console.error('Erreur dans showGameById:', err);
            res.status(500).json({ error: err });
        } else if (!results) {
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
    const name = req.query.name || '';

    const offset = (page - 1) * x;

    GameModel.getXGames(x, offset, sort, order, name, (err, results) => {
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
    const name = req.query.name || '';
    GameModel.getNbGames(name, (err, result) => {
        if (err) {
            console.error('Erreur dans countGames:', err);
            res.status(500).json({ error: err });
        } else {
            console.log('Nombre de jeux récupéré avec succès dans countGames');
            res.status(200).json({ total: result });
        }
    });
};

export const showCategoriesByGameId = (req, res) => {
    GameModel.getCategoriesByGameId(req.params.id, (err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.status(200).json(results);
    });
};

export const showFamiliesByGameId = (req, res) => {
    GameModel.getFamiliesByGameId(req.params.id, (err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.status(200).json(results);
    });
};

export const showMechanicsByGameId = (req, res) => {
    GameModel.getMechanicsByGameId(req.params.id, (err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.status(200).json(results);
    });
};

export const showDesignersByGameId = (req, res) => {
    GameModel.getDesignersByGameId(req.params.id, (err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.status(200).json(results);
    });
};

export const showArtistsByGameId = (req, res) => {
    GameModel.getArtistsByGameId(req.params.id, (err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.status(200).json(results);
    });
};

export const showPublishersByGameId = (req, res) => {
    GameModel.getPublishersByGameId(req.params.id, (err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.status(200).json(results);
    });
};

export const showImplementationsByGameId = (req, res) => {
    GameModel.getImplementationsByGameId(req.params.id, (err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.status(200).json(results);
    });
};

export const showExpansionsByGameId = (req, res) => {
    GameModel.getExpansionsByGameId(req.params.id, (err, results) => {
        if (err) res.status(500).json({ error: err });
        else res.status(200).json(results);
    });
};

export const showGameName = (req, res) => {
    GameModel.getGameName(req.params.Id, (err, result) => {
        if (err) res.status(500).json({ error: err });
        else {
            res.status(200).json(result);

        }
    });
};

export const showAllGamesNames = (req, res) => {
    GameModel.getAllGamesNames((err, results) => {
        console.log("Appel de showAllGamesNames", results);
        if (err) {
            console.error('Erreur dans showAllGamesNames:', err);
            res.status(500).json({ error: err });
        } else if (!results) {
            console.log('Aucun jeu trouvé dans showAllGamesNames');
            res.status(404).json({ error: 'No games found' });
        } else {
            console.log('Jeux récupérés avec succès dans showAllGamesNames');
            res.status(200).json(results);
        }
    });
};

export const showGameByName = (req, res) => {
    const name = req.params.name;
    GameModel.getGameByName(name, (err, results) => {
        if (err) {
            console.error('Erreur dans showGameByName:', err);
            res.status(500).json({ error: err });
        } else if (!results || (Array.isArray(results) && results.length === 0)) {
            console.log('Jeu non trouvé dans showGameByName');
            res.status(404).json({ error: 'Game not found' });
        } else {
            console.log('Jeu récupéré avec succès dans showGameByName');
            res.status(200).json(results);
        }
    });
};