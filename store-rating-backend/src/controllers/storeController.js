// src/controllers/storeController.js
const { Store, Rating, User } = require('../models');
const { Op } = require('sequelize');

// =======================
// Admin: Create store
// =======================
exports.createStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const store = await Store.create({ name, email, address, ownerId: req.user.id });
    res.status(201).json(store);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// =======================
// Admin: List all stores with ratings
// =======================
exports.listStores = async (req, res) => {
  try {
    const { name, address } = req.query;
    const filters = {};
    if (name) filters.name = { [Op.like]: `%${name}%` };
    if (address) filters.address = { [Op.like]: `%${address}%` };

    const stores = await Store.findAll({
      where: filters,
      include: [
        {
          model: Rating,
          as: 'ratings',
          include: [{ model: User, attributes: ['id', 'name'] }],
        },
      ],
    });

    const result = stores.map(store => {
      const ratingsArray = store.ratings.map(r => r.rating);
      const avgRating = ratingsArray.length
        ? ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length
        : null;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        overallRating: avgRating,
        ratings: store.ratings,
      };
    });

    res.json({ stores: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// =======================
// Normal User: Get stores with avg rating + user rating
// =======================
// getStoresForUser
exports.getStoresForUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const stores = await Store.findAll({
      include: [{
        model: Rating,
        as: 'ratings',       // use the alias from Store model
        include: [{
          model: User,
          as: 'user',        // use the alias from Rating model
          attributes: ['id', 'name']
        }]
      }],
    });

    const result = stores.map(store => {
      const ratingsArray = store.ratings.map(r => r.rating);
      const avgRating = ratingsArray.length ? ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length : null;
      const userRating = store.ratings.find(r => r.userId === userId)?.rating || null;

      return { 
        id: store.id, 
        name: store.name, 
        email: store.email, 
        address: store.address, 
        overallRating: avgRating, 
        userRating 
      };
    });

    res.json(result);
  } catch (err) {
    console.error("getStoresForUser error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};


// =======================
// Normal User: Submit or update rating
// =======================
exports.rateStore = async (req, res) => {
  try {
    const userId = req.user.id;
    const storeId = req.params.id;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5)
      return res.status(400).json({ message: 'Rating must be 1-5' });

    const existingRating = await Rating.findOne({ where: { userId, storeId } });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      await Rating.create({ userId, storeId, rating });
    }

    res.json({ message: 'Rating submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// =======================
// Store Owner: Dashboard view
// =======================
exports.getStoreOwnerDashboard = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: { ownerId: req.user.id },
      include: [{ model: Rating, as: "ratings" }],
    });

    if (!store) return res.status(404).json({ message: "Store not found" });

    const ratingsArray = store.ratings.map(r => r.rating);
    const avgRating = ratingsArray.length
      ? ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length
      : 0;

    res.json({ storeId: store.id, storeName: store.name, ratings: store.ratings, avgRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get store for the logged-in owner
exports.getStoreForOwner = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: { ownerId: req.user.id },
      include: [
        {
          model: Rating,
          as: "ratings",
          include: [{ model: User, attributes: ["id", "name"], as: "user" }],
        },
      ],
    });

    if (!store) return res.status(404).json({ message: "Store not found" });

    res.json({ store });
  } catch (err) {
    console.error("getStoreForOwner error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
