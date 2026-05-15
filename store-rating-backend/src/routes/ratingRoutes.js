const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const ratingController = require('../controllers/ratingController');

// Debugging line to see what's inside
console.log('DEBUG: RatingController contents:', Object.keys(ratingController));

// Route 1: Post a rating (Normal Users)
router.post('/', authenticate, authorize('normal'), ratingController.submitRating);

// Route 2: Get my ratings (Normal Users)
// THIS IS LIKELY LINE 12 - ensuring ratingController.getUserRatings is valid
router.get('/my-ratings', authenticate, authorize('normal'), ratingController.getUserRatings);

// Route 3: Get ratings for store owner
router.get('/store-owner', authenticate, authorize('store_owner'), ratingController.getStoreOwnerRatings);

module.exports = router;