import db from "../config/database.js";

export const getAllGames = (result)=>{
    db.query("SELECT * FROM Game", (err, results)=>{
        if(err){
            console.log(err);
            result(err, null);
        }else{
            result(null, results);
        }
    });


}

export const getGameById = (id, result)=>{
    db.query("SELECT * FROM Game WHERE id = ?", [id], (err, results)=>{
        if(err){
            console.log(err);
            result(err, null);
        }else{
            result(null, results[0]);
        }
    });
}

export const insertGame = (data, result) => {
    db.query("START TRANSACTION;");
    db.query(
        `INSERT INTO Game 
        (Name, Description, Year_, MinPlayer, MaxPlayer, PlayTime, MinPlaytime, MaxPlaytime, MinAge, Trading, Wishing, Average, NBRates, ImageURL, BGGURL, Price) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            data.Name,
            data.Description,
            data.Year_,
            data.MinPlayer,
            data.MaxPlayer,
            data.PlayTime,
            data.MinPlaytime,
            data.MaxPlaytime,
            data.MinAge,
            data.Trading,
            data.Wishing,
            data.Average,
            data.NBRates,
            data.ImageURL,
            data.BGGURL,
            data.Price,
        ],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
                db.query("COMMIT;");
            }
        }
    );
};

export const deleteGameById = (id, result)=>{
    db.query("DELETE FROM Game WHERE id = ?", [id], (err, results)=>{
        if(err){
            console.log(err);
            result(err, null);
        }else{
            result(null, results);
        }
    });
}

export const updateGameById = (data, result)=>{
    db.query("UPDATE game SET ? = ? WHERE ID = ?",
        [
            data.field,
            data.value,
            data.id
        ],
        (err, results)=>{
        if(err){
            console.log(err);
            result(err, null);
        }else{
            result(null, results);
        }
    });
}

export const getXGames = (x, offset, sort, order, result) => {
    // Valider les entrées pour éviter les injections SQL
    const validSortColumns = ['id', 'name', 'average', 'year_']; // Liste des colonnes autorisées
    const validOrder = ['ASC', 'DESC']; // Ordres autorisés

    // Vérifier si les colonnes et l'ordre sont valides
    if (!validSortColumns.includes(sort)) {
        sort = 'id'; // Colonne par défaut
    }
    if (!validOrder.includes(order.toUpperCase())) {
        order = 'ASC'; // Ordre par défaut
    }

    // Construire la requête SQL avec des valeurs sécurisées
    const query = `SELECT * FROM NewGames ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;

    // Exécuter la requête
    db.query(query, [x, offset], (err, results) => {
        if (err) {
            console.log('Erreur dans getXGames:', err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const getNbGames = (result) => {
    // Requête SQL pour compter le nombre total de jeux
    db.query("SELECT COUNT(1) AS total FROM NewGames", (err, results) => {
        if (err) {
            console.error("Erreur dans getNbGames:", err);
            result(err, null);
        } else {
            // Retourner le total des jeux
            result(null, results[0].total);
        }
    }
);
};

// Récupérer les catégories d'un jeu
export const getCategoriesByGameId = (id, result) => {
    db.query(
        "SELECT c.Name FROM Category c JOIN Belong b ON c.ID = b.CategoryID WHERE b.GameID = ?", [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Récupérer les familles d'un jeu
export const getFamiliesByGameId = (id, result) => {
    db.query(
        "SELECT f.Name FROM Familly f JOIN BelongFamily bf ON f.ID = bf.FamillyID WHERE bf.GameID = ?", [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Récupérer les mécaniques d'un jeu
export const getMechanicsByGameId = (id, result) => {
    db.query(
        "SELECT m.Name FROM Mechanic m JOIN Use_ u ON m.ID = u.MechanicID WHERE u.GameID = ?", [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Récupérer les designers d'un jeu
export const getDesignersByGameId = (id, result) => {
    db.query(
        "SELECT d.Name FROM Designer d JOIN Create_ c ON d.ID = c.DesignerID WHERE c.GameID = ?", [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Récupérer les illustrateurs d'un jeu
export const getArtistsByGameId = (id, result) => {
    db.query(
        "SELECT a.Name FROM Artist a JOIN Illustrate i ON a.ID = i.ArtistID WHERE i.GameID = ?", [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Récupérer les éditeurs d'un jeu
export const getPublishersByGameId = (id, result) => {
    db.query(
        "SELECT p.Name FROM Publisher p JOIN Publish pb ON p.ID = pb.PublisherID WHERE pb.GameID = ?", [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Récupérer les implémentations d'un jeu
export const getImplementationsByGameId = (id, result) => {
    db.query(
        "SELECT i.Name FROM Implementation i JOIN Implement imp ON i.ID = imp.ImplementationID WHERE imp.GameID = ?", [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Récupérer les extensions d'un jeu
export const getExpansionsByGameId = (id, result) => {
    db.query(
        "SELECT e.Name FROM Expansion e JOIN Extend ex ON e.ID = ex.ExpansionID WHERE ex.GameID = ?", [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};