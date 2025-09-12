const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { body } = require('express-validator');

const {
  listUsers,
  getUserDetails,
  dashboardStats,
  addUser,
  listStores,
  addStore,
  getStoreDetails,
  getStoreRatings  // <-- add this
} = require('../controllers/adminController');


// Apply authentication and role authorization for all admin routes
router.use(authenticate);
router.use(authorize('admin'));

// Dashboard stats
router.get('/dashboard', dashboardStats);

// Users
router.get('/users', listUsers);
router.get('/users/:id', getUserDetails);

router.post(
  '/users',
  [
    body('name').isLength({ min: 3, max: 60 }).withMessage('Name must be between 3 and 60 characters'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password')
      .isLength({ min: 8, max: 16 }).withMessage('Password must be between 8 and 16 characters')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
    body('address').isLength({ max: 400 }).withMessage('Address can be maximum 400 characters'),
    body('role').isIn(['admin', 'normal', 'store_owner']).withMessage('Role must be admin, normal, or store_owner')
  ],
  addUser
);

// Stores
router.get('/stores', listStores);
router.get('/stores/:id', getStoreDetails); // Get store by ID
router.post('/stores', addStore);


// Get all ratings for a store
router.get('/stores/:id/ratings', getStoreRatings);

module.exports = router;
