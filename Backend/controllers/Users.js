import e from "express";
import * as UserModel from "../models/UsersModel.js";
import jwt from 'jsonwebtoken';


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
                        const token = jwt.sign({ id: user[0].ID, username: user[0].UserName }, process.env.JWT_SECRET, { expiresIn: '2h' });
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
                        const token = jwt.sign({ id: user[0].id, username: user[0].username }, process.env.JWT_SECRET, { expiresIn: '2h' });
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

export const fetchUsernameById = (req, res) => {
    console.log("Fetching Username: ", req.params.Id);
    UserModel.getUsernameById(req.params.Id, (err, username) => {
        if (err) {
            console.error("Erreur dans fetchUsernameById:", err);
            res.status(500).json({ error: "Erreur serveur" });
        } else if (!username) {
            console.log("Aucun utilisateur trouvé avec cet ID");
            res.status(404).json({ error: "Utilisateur non trouvé" });
        } else {
            console.log("Utilisateur trouvé avec succès dans fetchUsernameById");
            res.status(200).json({ username: username.UserName }); // Accès direct à UserName
        }
    });
};


export const fetchUserBytoken = (req, res) => {
    console.log("Fetching User by token");
    const token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expiré', expired: true });
            } else {
                return res.status(403).json({ error: 'Token invalide' });
            }
        }
        // suite du traitement : récupération de l'utilisateur...
        if (err) {
            console.error("Erreur dans fetchUserBytoken:", err);
            return res.status(401).json({ error: "Token invalide" });
        }
        res.status(200).json({ id: decoded.id});
    });
};

export const fetchUserInfo = (req, res) => {
    console.log("Fetching User Info");
    const token = req.headers['authorization'];
    let userId;
    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expiré', expired: true });
            } else {
                return res.status(403).json({ error: 'Token invalide' });
            }
        }
        if (err) {
            console.error("Erreur dans fetchUserBytoken:", err);
            return res.status(401).json({ error: "Token invalide" });
        }
        userId = decoded.id;
        UserModel.getUserById(userId, (err, user) => {
            if (err) {
                console.error("Erreur dans fetchUserInfo:", err);
                res.status(500).json({ error: "Erreur serveur" });
            } else if (!user) {
                console.log("Aucun utilisateur trouvé avec cet ID");
                res.status(404).json({ error: "Utilisateur non trouvé" });
            } else {
                console.log("Utilisateur trouvé avec succès dans fetchUserInfo");
                return res.status(200).json(user);
            }
        });
    });
};

export const updateProfile = (req, res) => {
    console.log("Updating Profile");
    const token = req.headers['authorization'];
    let userId;
    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expiré', expired: true });
            } else {
                return res.status(403).json({ error: 'Token invalide' });
            }
        }
        if (err) {
            console.error("Erreur dans fetchUserBytoken:", err);
            return res.status(401).json({ error: "Token invalide" });
        }
        userId = decoded.id;
        const data = req.body;
        UserModel.updateProfile(userId, data, (err, user) => {
            if (err) {
                console.error("Erreur dans updateProfile:", err);
                res.status(500).json({ error: "Erreur serveur" });
            } else if (!user) {
                console.log("Aucun utilisateur trouvé avec cet ID");
                res.status(404).json({ error: "Utilisateur non trouvé" });
            } else {
                console.log("Utilisateur mis à jour avec succès dans updateProfile");
                return res.status(200).json(user);
            }
        });
    });
};

export const updateEmail = (req, res) => {
    console.log("Updating an email...");
    const token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expiré', expired: true });
            } else {
                return res.status(403).json({ error: 'Token invalide' });
            }
        }
        const userId = decoded.id;
        const newEmail = req.body.newEmail;
        if (!newEmail) {
            return res.status(400).json({ error: 'Nouvel email manquant' });
        }
        UserModel.updateEmail(userId, newEmail, (err, result) => {
            if (err) {
                console.error("Erreur lors de la mise à jour de l'email:", err);
                res.status(500).json({ error: "Erreur serveur" });
            } else {
                console.log("Email mis à jour avec succès");
                res.status(200).json({ message: "Email mis à jour" });
            }
        });
    });
};

export const updatePassword = (req, res) => {
    console.log("Updating a password...");
    const token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expiré', expired: true });
            } else {
                return res.status(403).json({ error: 'Token invalide' });
            }
        }
        const userId = decoded.id;
        const newPassword = req.body.newPassword;
        if (!newPassword) {
            return res.status(400).json({ error: 'Nouveau mot de passe manquant' });
        }
        UserModel.updatePassword(userId, newPassword, (err, result) => {
            if (err) {
                console.error("Erreur lors de la mise à jour du mot de passe:", err);
                res.status(500).json({ error: "Erreur serveur" });
            } else {
                console.log("Mot de passe mis à jour avec succès");
                res.status(200).json({ message: "Mot de passe mis à jour" });
            }
        });
    });
};

export const getAllUsers = (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expiré', expired: true });
            } else {
                return res.status(403).json({ error: 'Token invalide' });
            }
        }

        UserModel.getAllUsers((err, users) => {
            if (err) {
                console.error("Erreur lors de la récupération des utilisateurs:", err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }

            res.status(200).json(users);
        });
    });
};

export const updateUser = (req, res) => {
    console.log("Updating user...");
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expiré', expired: true });
            } else {
                return res.status(403).json({ error: 'Token invalide' });
            }
        }

        UserModel.getUserById(decoded.id, (err, user) => {
            if (err) {
                console.error("Erreur lors de la vérification du niveau d'admin:", err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }

            if (!user || user.Admin == 0) {
                return res.status(403).json({ error: 'Accès refusé : privilèges insuffisants' });
            }

            const data = req.body;
            const targetId = data.ID;

            if (!targetId) {
                return res.status(400).json({ error: 'ID utilisateur à modifier manquant' });
            }

            UserModel.updateUser(targetId, data, (err, result) => {
                if (err) {
                    console.error("Erreur lors de la mise à jour de l'utilisateur:", err);
                    return res.status(500).json({ error: 'Erreur serveur' });
                }

                return res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
            });
        });
    });
};



export const deleteUser = (req, res) => {
    console.log("Suppression de l'utilisateur...", req.params.id);
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expiré', expired: true });
            } else {
                return res.status(403).json({ error: 'Token invalide' });
            }
        }

        UserModel.getUserById(decoded.id, (err, user) => {
            if (err) {
                console.error("Erreur lors de la vérification du niveau d'admin:", err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }

            if (!user || user.Admin == 0) {
                return res.status(403).json({ error: 'Accès refusé : privilèges insuffisants' });
            }

            const userIdToDelete = req.params.id;

            if (!userIdToDelete) {
                return res.status(400).json({ error: 'ID utilisateur à supprimer manquant' });
            }

            UserModel.deleteUser(userIdToDelete, (err, result) => {
                if (err) {
                    console.error("Erreur lors de la suppression de l'utilisateur:", err);
                    return res.status(500).json({ error: 'Erreur serveur' });
                }

                return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
            });
        });
    });
};