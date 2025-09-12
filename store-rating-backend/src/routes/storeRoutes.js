const express = require('express');
const router = express.Router();
const { createStore, listStores } = require('../controllers/storeController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { body, query } = require('express-validator');

// ✅ Admin: Create new store
router.post(
  '/',
  authenticate,
  authorize('admin'),
  [
    body('name')
      .isLength({ min: 3, max: 60 })
      .withMessage('Store name must be between 3 and 60 characters'),
    body('email')
      .isEmail()
      .withMessage('Enter a valid store email address'),
    body('address')
      .isLength({ max: 400 })
      .withMessage('Address can be maximum 400 characters'),
  ],
  createStore
);

// ✅ List stores with optional filters for name/address
router.get(
  '/',
  authenticate,
  [
    query('name').optional().isString().withMessage('Name must be a string'),
    query('address').optional().isString().withMessage('Address must be a string'),
  ],
  listStores
);

module.exports = router;
