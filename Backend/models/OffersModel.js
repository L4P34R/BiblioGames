import db from '../config/database.js';

export const fetchOffers = (limit, offset, callback) => {
  try {
    const sql = `SELECT * FROM GameOffer ORDER BY Date_ DESC LIMIT ? OFFSET ?`;
    db.query(sql, [limit, offset], (err, results) => {
      if (err) return callback(new Error('Failed to fetch offers: ' + err.message));
      callback(null, results);
    });
  } catch (err) {
    callback(new Error('Unexpected error in fetchOffers: ' + err.message));
  }
};

export const countOffers = (callback) => {
  try {
    db.query('SELECT COUNT(*) AS total FROM GameOffer', (err, results) => {
      if (err) return callback(new Error('Failed to count offers: ' + err.message));
      callback(null, results);
    });
  } catch (err) {
    callback(new Error('Unexpected error in countOffers: ' + err.message));
  }
};

export const insertOffer = (gameID, userID, price, damage, about, callback) => {
  try {
    const sql = `
      INSERT INTO GameOffer (GameID, UserID, Price, Damage, About, Date_)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    db.query(sql, [gameID, userID, price, damage, about], (err, results) => {
      if (err) return callback(new Error('Failed to insert offer: ' + err.message));
      callback(null, results);
    });
  } catch (err) {
    callback(new Error('Unexpected error in insertOffer: ' + err.message));
  }
};

export const removeOffer = (offerId, callback) => {
  try {
    db.query('DELETE FROM GameOffer WHERE ID = ?', [offerId], (err, results) => {
      if (err) return callback(new Error('Failed to delete offer: ' + err.message));
      callback(null, results);
    });
  } catch (err) {
    callback(new Error('Unexpected error in removeOffer: ' + err.message));
  }
};

export const fetchOfferById = (offerId, callback) => {
  try {
    db.query('SELECT * FROM GameOffer WHERE ID = ?', [offerId], (err, results) => {
      if (err) return callback(new Error('Failed to fetch offer: ' + err.message));
      callback(null, results);
    });
  } catch (err) {
    callback(new Error('Unexpected error in fetchOfferById: ' + err.message));
  }
};

export const updateOffer = (offerId, gameID, userID, price, damage, about, callback) => {
  try {
    const sql = `
      UPDATE GameOffer
      SET GameID = ?, UserID = ?, Price = ?, Damage = ?, About = ?
      WHERE ID = ?
    `;
    db.query(sql, [gameID, userID, price, damage, about, offerId], (err, results) => {
      if (err) return callback(new Error('Failed to update offer: ' + err.message));
      callback(null, results);
    });
  } catch (err) {
    callback(new Error('Unexpected error in updateOffer: ' + err.message));
  }
};
