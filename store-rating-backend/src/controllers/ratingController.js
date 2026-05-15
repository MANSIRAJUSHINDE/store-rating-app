const { Rating, Store, User } = require('../models');

exports.submitRating = async (req, res) => {
    try {
        const { storeId, rating, feedback } = req.body;
        const newRating = await Rating.create({
            userId: req.user.id,
            storeId,
            rating,
            feedback
        });
        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ message: "Error submitting rating" });
    }
};

exports.getUserRatings = async (req, res) => {
    try {
        const ratings = await Rating.findAll({ where: { userId: req.user.id } });
        res.json(ratings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ratings" });
    }
};

exports.getStoreOwnerRatings = async (req, res) => {
    try {
        // Logic to get ratings for stores owned by this user
        res.json({ message: "Owner ratings feature" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};