import * as UserModel from "../models/UsersModel.js";
import jwt from 'jsonwebtoken';
const SECRET_KEY = 'bibliogames_secret_key';


export const registerUser = (req, res) => {
    console.log("Appel de registerUser");
    const data = req.body;
    UserModel.insertUser(data, (err, results) => {
        if (err) {
            console.error('Erreur dans registerUser:', err);
            if (err.sqlState === '45000') {
                return res.status(400).json({ error: err.sqlMessage }); // ex: "Email already exists"
              }
        } else {
            console.log('Utilisateur ajouté avec succès dans registerUser');
            res.status(200).json(results);
        }
    });
}

export const loginUser = (req, res) => {
    console.log("Appel de loginUser");
    const data = req.body;
    if (req.body.username.includes("@")){
        UserModel.getUserByEmail(data.username, (err, results) => {
            if (err) {
                console.error('Erreur dans loginUser:', err);
                res.status(500).json({ error: 'Erreur serveur' });
            } else if (results.length === 0) {
                res.status(401).json({ error: 'Utilisateur non trouvé' });
            } else {
                UserModel.comparePassword(data.password, results[0].ID, (err, user) => {
                    if (err) {
                        console.error('Erreur dans loginUser:', err);
                        res.status(500).json({ error: 'Erreur serveur' });
                    }

                    else if (user) {
                        console.log('Utilisateur connecté avec email dans loginUser');
                        const token = jwt.sign({ id: user[0].ID, username: user[0].UserName }, SECRET_KEY, { expiresIn: '2h' });
                        res.status(200).json(token);
                    }
                    else {
                        res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
            });
        }
        });
    }
    else {
        UserModel.getUserByEmail(data.username, (err, results) => {
            if (err) {
                console.error('Erreur dans loginUser:', err);
                res.status(500).json({ error: 'Erreur serveur' });
            } else if (results.length === 0) {
                res.status(401).json({ error: 'Utilisateur non trouvé' });
            } else {
                UserModel.comparePassword(data.password, results[0].ID, (err, user) => {
                    if (err) {
                        console.error('Erreur dans loginUser:', err);
                        res.status(500).json({ error: 'Erreur serveur' });
                    }

                    else if (user) {
                        console.log('Utilisateur connecté avec username dans loginUser');
                        const token = jwt.sign({ id: user[0].id, username: user[0].username }, SECRET_KEY, { expiresIn: '2h' });
                        res.status(200).json(token);
                    }
                    else {
                        res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
            });
        }
        });
    }
}