import * as OffersModel from '../models/OffersModel.js';

export const addOffer = (req, res) => {
  try {
    const { GameID, UserID, Price, Damage, About } = req.body;
    OffersModel.insertOffer(GameID, UserID, Price, Damage, About, (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to insert offer', detail: err });
      res.status(201).json({ message: 'Offer added', id: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error', detail: err });
  }
};

export const deleteOffer = (req, res) => {
  try {
    const offerId = req.params.id;
    OffersModel.removeOffer(offerId, (err) => {
      if (err) return res.status(500).json({ error: 'Failed to delete offer', detail: err });
      res.status(200).json({ message: 'Offer deleted' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error', detail: err });
  }
};

export const getOfferById = (req, res) => {
  try {
    const offerId = req.params.id;
    OffersModel.fetchOfferById(offerId, (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch offer', detail: err });
      if (result.length === 0) return res.status(404).json({ error: 'Offer not found' });
      res.status(200).json(result[0]);
    });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error', detail: err });
  }
}

export const updateOffer = (req, res) => {
  try {
    const offerId = req.params.id;
    const { GameID, UserID, Price, Damage, About } = req.body;

    OffersModel.updateOffer(offerId, GameID, UserID, Price, Damage, About, (err) => {
      if (err) return res.status(500).json({ error: 'Failed to update offer', detail: err });
      res.status(200).json({ message: 'Offer updated' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error', detail: err });
  }
};

export const ShowXOffers = (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    OffersModel.fetchOffers(limit, offset, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch offers', detail: err });
      } else {
        console.log('Offers fetched successfully');
        res.status(200).json(results);
    }
    });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error', detail: err });
  }
};

export const getCountOffers = (req, res) => {
  try {
    OffersModel.countOffers((err, result) => {
      if (err){
         return res.status(500).json({ error: 'Failed to count offers', detail: err });
        } else {
          console.log('offersCount', result.total);
      res.status(200).json({ total: result[0].total });
        }
    });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error', detail: err });
  }
}