const { Rating, Store, User } = require('../models');

// ✅ Submit or update a rating
exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user?.id; // Added safe access (req.user?.id)

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    // Validate inputs
    if (!storeId || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Invalid store ID or rating (1-5 required)' });
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
    res.status(500).json({ message: 'Server error during submission' });
  }
};

// ... (Other functions follow same pattern)