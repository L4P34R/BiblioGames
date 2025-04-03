//import conection

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
                (ID, Name, Description, Year_, MinPlayer, MaxPlayer, PlayTime, MinPlaytime, MaxPlaytime, MinAge, Trading, Whishing, Average, NBRates, ImageURL, BGGURL, Price) 
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

