// src/controllers/storeController.js
const { Store, Rating, User } = require('../models');
const { Op } = require('sequelize');

// =======================
// Admin: List all stores with ratings
// =======================
exports.listStores = async (req, res) => {
  try {
    const { name, address } = req.query;
    const filters = {};
    // Use Op.iLike for case-insensitive search if using Postgres, 
    // Op.like is fine for MySQL
    if (name) filters.name = { [Op.like]: `%${name}%` };
    if (address) filters.address = { [Op.like]: `%${address}%` };

    const stores = await Store.findAll({
      where: filters,
      include: [
        {
          model: Rating,
          as: 'ratings',
          include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
        },
      ],
    });

    const result = stores.map(store => {
      // Safety check: ensure store.ratings exists
      const ratings = store.ratings || [];
      const ratingsArray = ratings.map(r => r.rating);
      const avgRating = ratingsArray.length
        ? (ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length).toFixed(1)
        : null;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        overallRating: avgRating ? parseFloat(avgRating) : null,
        ratings: ratings,
      };
    });

    res.json({ stores: result });
  } catch (err) {
    console.error("List stores error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ... keep rateStore and other functions as they are, 
// they are already well-structured.