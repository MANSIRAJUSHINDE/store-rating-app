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
      const averageRating = store.ratings.length
        ? (store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length).toFixed(1)
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
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------------
// List all users with average rating (if store_owner)
// --------------------
exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'address', 'role'],
      include: [
        {
          model: Store,
          as: 'ownedStores',
          include: [{ model: Rating, as: 'ratings' }]
        }
      ]
    });

    const response = users.map(u => {
      let averageRating = null;
      if (u.role === 'store_owner' && u.ownedStores?.length > 0) {
        let totalRatings = 0;
        let ratingsCount = 0;
        u.ownedStores.forEach(store => {
          store.ratings.forEach(r => {
            totalRatings += r.rating;
            ratingsCount++;
          });
        });
        averageRating = ratingsCount ? (totalRatings / ratingsCount).toFixed(1) : null;
      }

      return {
        id: u.id,
        name: u.name,
        email: u.email,
        address: u.address,
        role: u.role,
        averageRating
      };
    });

    res.json({ users: response });
  } catch (err) {
    console.error('List users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------------
// Get user details by ID
// --------------------
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'address', 'role'],
      include: [
        {
          model: Store,
          as: 'ownedStores',
          include: [{ model: Rating, as: 'ratings' }]
        }
      ]
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
    };

    if (user.role === 'store_owner' && user.ownedStores?.length > 0) {
      let totalRatings = 0;
      let ratingsCount = 0;
      user.ownedStores.forEach(store => {
        store.ratings.forEach(rating => {
          totalRatings += rating.rating;
          ratingsCount++;
        });
      });
      response.storeRating = ratingsCount ? (totalRatings / ratingsCount).toFixed(1) : null;
      response.storesOwned = user.ownedStores.map(store => ({
        id: store.id,
        name: store.name,
        averageRating: store.ratings.length
          ? (store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length).toFixed(1)
          : null
      }));
    }

    res.json(response);
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------------
// Dashboard stats
// --------------------
exports.dashboardStats = async (req, res) => {
  try {
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

// --------------------
// Add new store
// --------------------
exports.addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const existingStore = await Store.findOne({ where: { email } });
    if (existingStore) return res.status(400).json({ message: 'Store email already exists' });

    const owner = await User.findByPk(ownerId);
    if (!owner || owner.role !== 'store_owner') {
      return res.status(400).json({ message: 'Invalid store owner' });
    }

    const newStore = await Store.create({ name, email, address, ownerId });

    res.status(201).json({
      message: 'Store created successfully',
      store: {
        id: newStore.id,
        name: newStore.name,
        email: newStore.email,
        address: newStore.address,
        ownerId: newStore.ownerId
      }
    });
  } catch (error) {
    console.error('Add store error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// --------------------
// Get store details by ID
// --------------------
exports.getStoreDetails = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id, {
      include: [{ model: Rating, as: 'ratings' }]
    });

    if (!store) return res.status(404).json({ message: 'Store not found' });

    const averageRating = store.ratings.length
      ? (store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length).toFixed(1)
      : 0;

    res.json({
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      ownerId: store.ownerId,
      averageRating
    });
  } catch (error) {
    console.error('Get store details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get store ratings with user info
exports.getStoreRatings = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id, {
      include: [
        {
          model: Rating,
          as: 'ratings',
          include: [
            { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
          ]
        }
      ]
    });

    if (!store) return res.status(404).json({ message: 'Store not found' });

    const ratingsWithUser = store.ratings.map(r => ({
      id: r.id,
      rating: r.rating,
      userId: r.userId,
      userName: r.user?.name,
      userEmail: r.user?.email
    }));

    res.json({
      storeId: store.id,
      storeName: store.name,
      ratings: ratingsWithUser
    });
  } catch (error) {
    console.error('Get store ratings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
