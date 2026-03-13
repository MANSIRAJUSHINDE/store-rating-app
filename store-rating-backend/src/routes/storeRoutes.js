const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const {
  createStore,
  listStores,
  getStoresForUser,
  rateStore,
  getStoreForOwner, // ← updated import
} = require('../controllers/storeController');

// ===================
// Admin routes
// ===================
// Add this right before line 16
const handlers = [yourMiddleware1, yourMiddleware2, yourHandler];
handlers.forEach((h, index) => {
  if (typeof h !== 'function') {
    console.error(`ERROR: Handler at index ${index} is not a function! It is:`, h);
  }
});

router.post(
  '/',
  authenticate,
  authorize('admin'),
  [
    body('name').isLength({ min: 3, max: 60 }),
    body('email').isEmail(),
    body('address').isLength({ max: 400 }),
  ],
  createStore
);

router.get('/', authenticate, authorize('admin'), listStores);

// ===================
// Normal user routes
// ===================
router.get('/user', authenticate, getStoresForUser);
router.post('/:id/rate', authenticate, rateStore);

// ===================
// Store Owner route
// ===================
router.get('/owner', authenticate, authorize('store_owner'), getStoreForOwner);

module.exports = router;
