import db from "../config/database.js";
import bcrypt from 'bcryptjs';


export const insertUser = (data, result) => {
    console.log(data);
    bcrypt.hash(data.password, 10, (err, hashedPassword) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            const accountCreationDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            db.query("START TRANSACTION;");
            db.query(
                `INSERT INTO User_ 
                (FirstName, LastName, UserName, Email, Password, AccountCreationDate) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    data.firstName,
                    data.lastName,
                    data.userName,
                    data.email,
                    hashedPassword,
                    accountCreationDate
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
        }
    });
};

export const getUserByEmail = (email, result) => {
    db.query("SELECT * FROM User_ WHERE Email = ?", [email], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const comparePassword = (password, id, result) => {
    db.query("SELECT * FROM User_ WHERE ID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else if (results.length === 0) {
            result(null, false);
        } else {
            const hash = results[0].Password;
            bcrypt.compare(password, hash, (err, res) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else if (res) {
                    result(null, results); // succès : retourne l'utilisateur
                } else {
                    result(null, false); // mauvais mot de passe
                }
            });
        }
    });
};

export const getUsernameById = (id, result) => {
    db.query("SELECT UserName FROM User_ WHERE ID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else if (results.length === 0) {
            result(null, false);
        } else {
            console.log("Username ", results[0], " fetch successfully.");
            result(null, results[0]);
        }
    });
};