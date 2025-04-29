import db from "../config/database.js";

export const getLatestReviews = (limit, result) => {
    db.query("SELECT * FROM ReviewCard LIMIT ?",[limit] , (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const getReviewsByGameId = (gameId, limit, offset, result) => {
    db.query("SELECT * FROM ProductReview WHERE GameID = ? ORDER BY ID DESC LIMIT ? OFFSET ?", [gameId, limit, offset], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const addReview = (data, result) => {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    db.query("START TRANSACTION;");
    db.query(
        `INSERT INTO Rating
        (GameID, UserID, Note, Review, Date) 
        VALUES (?, ?, ?, ?, ?)`,
        [
            data.GameId,
            data.UserId,
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
                db.query("COMMIT;");
            }
        }
    );
};

export const updateReview = (data, result) => {
    db.query(
        "UPDATE Rating SET Note = ?, Review = ? WHERE ID = ?",
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