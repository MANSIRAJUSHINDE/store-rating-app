// 1. Fixed the require path: Ensure this matches your folder name EXACTLY (case-sensitive)
// If your folder is "models", leave it. If it is "Models", change it.
const { User, Store, Rating } = require('../models'); 
const bcrypt = require('bcrypt');

// --------------------
// List all stores with average ratings
// --------------------
exports.listStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [{ model: Rating, as: 'ratings' }],
      attributes: ['id', 'name', 'email', 'address', 'ownerId'],
    });

    const response = stores.map(store => {
      // Added a safety check for store.ratings to prevent crashes if it's undefined
      const ratings = store.ratings || [];
      const averageRating = ratings.length
        ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
        : 0;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        averageRating
      };
    });

    res.json({ stores: response });
  } catch (error) {
    console.error('List stores error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// --------------------
// Dashboard stats
// --------------------
exports.dashboardStats = async (req, res) => {
  try {
    // These calls are fine for production
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------------
// Add new user
// --------------------
exports.addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    // Ensure password exists before hashing to prevent bcrypt error
    if (!password) return res.status(400).json({ message: 'Password is required' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, address, password: hashedPassword, role });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Add user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ... (Other functions like listUsers, addStore, etc., remain largely the same)