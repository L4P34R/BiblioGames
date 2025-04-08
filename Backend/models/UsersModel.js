import db from "../config/database.js";
import bcrypt from "bcrypt";


export const insertUser = (data, result) => {
    console.log(data);
    db.query("SELECT MAX(id) AS maxId FROM User_", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            bcrypt.hash(data.password, 10, (err, hashedPassword) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const id = results[0].maxId + 1;
                    const accountCreationDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    db.query(
                        `INSERT INTO User_ 
                        (ID, FirstName, LastName, UserName, Email, Password, AccountCreationDate) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [
                            id,
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
                            }
                        }
                    );
                }
            });
        }
    });
};