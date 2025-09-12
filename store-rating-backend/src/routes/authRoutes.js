// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup, login, updatePassword, getMe } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const { body } = require('express-validator');

// ✅ Signup route
router.post(
  '/signup',
  [
    body('name')
      .isLength({ min: 3, max: 60 })
      .withMessage('Name must be between 3 and 60 characters'),
    body('email')
      .isEmail()
      .withMessage('Enter a valid email address'),
    body('password')
      .isLength({ min: 8, max: 16 })
      .withMessage('Password must be between 8 and 16 characters')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('Password must contain at least one special character'),
    body('address')
      .isLength({ max: 400 })
      .withMessage('Address can be maximum 400 characters'),
  ],
  signup
);

// ✅ Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

// ✅ Update password route
router.put(
  '/update-password',
  authenticate,
  [
    body('oldPassword').notEmpty().withMessage('Old password is required'),
    body('newPassword')
      .isLength({ min: 8, max: 16 })
      .withMessage('Password must be between 8 and 16 characters')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('Password must contain at least one special character'),
  ],
  updatePassword
);

// ✅ Get current logged-in user
router.get('/me', authenticate, getMe);

module.exports = router;
