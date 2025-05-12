import db from "../config/database.js";
import bcrypt from 'bcryptjs';

const formatDateForSQL = (isoString) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    const pad = n => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

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
    db.query("SELECT * FROM User_ WHERE email = ?", [email], (err, results) => {
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

export const getUserById = (id, result) => {
    db.query("SELECT * FROM User_ WHERE ID = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else if (results.length === 0) {
            result(null, false);
        } else {
            console.log("User ", results[0].ID, " fetch successfully.");
            result(null, results[0]);
        }
    });
};

export const updateProfile = (userId, data, result) => {
    db.query(
        `UPDATE User_
            SET FirstName = ?, LastName = ?, UserName = ?, BirthDate = ?, Color = ?
            WHERE ID = ?`,
        [
            data.FirstName,
            data.LastName,
            data.UserName,
            data.Birthdate,
            data.Color,
            userId
        ],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                console.log("User ", userId, " updated successfully.");
                result(null, results);
            }
        }
    );
};


export const updateEmail = (userId, newEmail, result) => {
    db.query(
        "UPDATE User_ SET email = ? WHERE ID = ?",
        [newEmail, userId],
        (err, results) => {
            if (err) {
                console.log("Erreur dans updateEmail:", err);
                result(err, null);
            } else {
                console.log("Email updated for user", userId);
                result(null, results);
            }
        }
    );
};

export const updatePassword = (userId, newPassword, result) => {
    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
            console.log("Erreur dans le hash du mot de passe:", err);
            result(err, null);
        } else {
            db.query(
                "UPDATE User_ SET Password = ? WHERE ID = ?",
                [hashedPassword, userId],
                (err, results) => {
                    if (err) {
                        console.log("Erreur dans updatePassword:", err);
                        result(err, null);
                    } else {
                        console.log("Password updated for user", userId);
                        result(null, results);
                    }
                }
            );
        }
    });
};

export const getAllUsers = (result) => {
    db.query("SELECT ID, FirstName, LastName, UserName, email, Color, Birthdate, AccountCreationDate, Admin FROM User_", (err, results) => {
        if (err) {
            console.log("Erreur dans getAllUsers:", err);
            result(err, null);
        } else {
            console.log("Tous les utilisateurs récupérés avec succès.");
            result(null, results);
        }
    });
};

export const updateUser = (userId, data, result) => {
    const birthDate = formatDateForSQL(data.Birthdate);
    const accountDate = formatDateForSQL(data.AccountCreationDate);
    db.query(
        `UPDATE User_ SET 
            FirstName = ?, 
            LastName = ?, 
            UserName = ?, 
            Email = ?, 
            Birthdate = ?, 
            Color = ?, 
            AccountCreationDate = ?, 
            Admin = ?
        WHERE ID = ?`,
        [
            data.FirstName,
            data.LastName,
            data.UserName,
            data.email,
            birthDate,
            data.Color,
            accountDate,
            data.Admin,
            userId
        ],
        (err, results) => {
            if (err) {
                console.log("Erreur dans updateUser:", err);
                result(err, null);
            } else {
                console.log("Utilisateur mis à jour avec succès (ID:", userId, ")");
                result(null, results);
            }
        }
    );
};

export const deleteUser = (userId, result) => {
    db.query("DELETE FROM User_ WHERE ID = ?", [userId], (err, results) => {
        if (err) {
            console.log("Erreur dans deleteUser:", err);
            result(err, null);
        } else {
            console.log("Utilisateur supprimé avec succès (ID:", userId, ")");
            result(null, results);
        }
    });
};