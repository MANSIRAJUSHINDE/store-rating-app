const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const adminController = require('../controllers/adminController');

// Global middleware for all admin routes
router.use(authenticate);
router.use(authorize('admin'));

// Dashboard stats
router.get('/dashboard', adminController.dashboardStats);

// User Management
router.get('/users', adminController.listUsers);
router.get('/users/:id', adminController.getUserDetails);
router.post(
  '/users',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
  ],
  adminController.addUser
);

// Store Management
router.get('/stores', adminController.listStores);
router.get('/stores/:id', adminController.getStoreDetails);
router.post(
  '/stores',
  [
    body('name').notEmpty().withMessage('Store name required'),
    body('email').isEmail().withMessage('Store email required')
  ],
  adminController.addStore
);

// Rating Management
router.get('/stores/:id/ratings', adminController.getStoreRatings);

module.exports = router;