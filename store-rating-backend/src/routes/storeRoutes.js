const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const storeController = require('../controllers/storeController');

// Log this to your console to debug live
console.log('DEBUG: StoreController contents:', Object.keys(storeController));

router.post(
  '/',
  authenticate,
  authorize('admin'),
  [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
  ],
  storeController.createStore // Use the direct dot notation
);

router.get('/', authenticate, authorize('admin'), storeController.listStores);
router.get('/user', authenticate, storeController.getStoresForUser);
router.post('/:id/rate', authenticate, storeController.rateStore);
router.get('/owner', authenticate, authorize('store_owner'), storeController.getStoreForOwner);

module.exports = router;