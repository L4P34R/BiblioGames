import * as GameModel from "../models/UsersModel.js";


export const registerUser = (req, res) => {
    console.log("Appel de registerUser");
    const data = req.body;
    GameModel.insertUser(data, (err, results) => {
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