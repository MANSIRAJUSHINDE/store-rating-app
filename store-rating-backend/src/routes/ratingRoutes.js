const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { submitRating, getUserRatings, getStoreOwnerRatings } = require('../controllers/ratingController');

// Normal user routes
router.post('/', authenticate, authorize('user'), submitRating);
router.get('/my-ratings', authenticate, authorize('user'), getUserRatings);

// Store Owner routes
router.get('/store-owner', authenticate, authorize('store_owner'), getStoreOwnerRatings);

module.exports = router;
