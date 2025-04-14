import db from "../config/database.js";

export const getLatestReviews = (limit, result) => {
    db.query("SELECT * FROM Rating WHERE Review IS NOT NULL ORDER BY Date DESC LIMIT ?",[limit] , (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const getReviewsByGameId = (gameId, limit, offset, result) => {
    db.query("SELECT * FROM Rating WHERE GameID = ? ORDER BY ID DESC LIMIT ? OFFSET ?", [gameId, limit, offset], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const addReview = (data, result) => {
    db.query("SELECT MAX(id) AS maxId FROM Rating", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            const id = results[0].maxId + 1;
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            db.query(
                `INSERT INTO Rating
                (ID, GameID, UserID, Note, Review, Date) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    id,
                    data.GameID,
                    data.UserID,
                    data.Note,
                    data.Content,
                    date
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

export const updateReview = (data, result) => {
    db.query(
        "UPDATE Rating SET Note = ? Review = ? WHERE ID = ?",
        [data.Note, data.Content, data.ID],
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

export const deleteReview = (id, result) => {
    db.query("DELETE FROM Rating WHERE ID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const getReviewById = (id, result) => {
    db.query("SELECT * FROM Rating WHERE ID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const getAverageRatingByGameId = (gameId, result) => {
    db.query("SELECT AVG(Note) AS AverageRating FROM Rating WHERE GameID = ?", [gameId], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};