const { Store, Rating, User } = require('../models');
const { Op } = require('sequelize');

// ✅ Admin: Add new store
exports.createStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const store = await Store.create({ name, email, address, ownerId: req.user.id });
    res.status(201).json(store);
  } catch (error) {
    console.error('Create store error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ List all stores with optional search & overall rating
exports.listStores = async (req, res) => {
  try {
    const { name, address } = req.query;
    const filters = {};
    if (name) filters.name = { [Op.like]: `%${name}%` };
    if (address) filters.address = { [Op.like]: `%${address}%` };

    const stores = await Store.findAll({
      where: filters,
      include: [{
        model: Rating,
        include: [{ model: User, attributes: ['id', 'name'] }],
      }],
    });

    // Format stores with overall rating
    const result = stores.map(store => {
      const ratingsArray = store.Ratings.map(r => r.rating);
      const avgRating = ratingsArray.length ? ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length : null;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        overallRating: avgRating,
        ratings: store.Ratings, // includes each user's submitted rating
      };
    });

    res.json(result);
  } catch (error) {
    console.error('List stores error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
