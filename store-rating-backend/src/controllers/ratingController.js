const { Rating, Store, User } = require('../models');

// ✅ Submit or update a rating
exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if rating already exists
    let existingRating = await Rating.findOne({ where: { storeId, userId } });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      return res.json({ message: 'Rating updated successfully', rating: existingRating });
    }

    // Create new rating
    const newRating = await Rating.create({ storeId, userId, rating });
    res.status(201).json({ message: 'Rating submitted successfully', rating: newRating });

  } catch (error) {
    console.error('Submit rating error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get ratings submitted by logged-in user
exports.getUserRatings = async (req, res) => {
  try {
    const userId = req.user.id;

    const ratings = await Rating.findAll({
      where: { userId },
      include: [{ model: Store, attributes: ['id', 'name', 'address', 'email'] }],
    });

    res.json(ratings);
  } catch (error) {
    console.error('Get user ratings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Store owner: get ratings for their stores
exports.getStoreOwnerRatings = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const stores = await Store.findAll({
      where: { ownerId },
      include: [{
        model: Rating,
        as: 'ratings',
        include: [{ model: User, attributes: ['id', 'name', 'email'] }]
      }],
    });

    const response = stores.map(store => {
      const ratingsArray = store.ratings.map(r => r.rating);
      const avgRating = ratingsArray.length ? ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length : null;

      return {
        storeId: store.id,
        storeName: store.name,
        storeEmail: store.email,
        storeAddress: store.address,
        averageRating: avgRating,
        ratings: store.ratings,
      };
    });

    res.json(response);
  } catch (error) {
    console.error('Store owner ratings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
