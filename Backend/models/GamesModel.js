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
    db.query("SELECT MAX(id) AS maxId FROM Game", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            const id = results[0].maxId + 1;
            db.query(
                `INSERT INTO Game 
                (ID, Name, Description, Year_, MinPlayer, MaxPlayer, PlayTime, MinPlaytime, MaxPlaytime, MinAge, Trading, Whising, Average, NBRates, ImageURL, BGGURL, Price) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    id,
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
                    }
                }
            );
        }
    });
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
    const query = `SELECT * FROM Game ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;

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
    db.query("SELECT COUNT(*) AS total FROM Game", (err, results) => {
        if (err) {
            console.error("Erreur dans getNbGames:", err);
            result(err, null);
        } else {
            // Retourner le total des jeux
            result(null, results[0].total);
        }
    });
};