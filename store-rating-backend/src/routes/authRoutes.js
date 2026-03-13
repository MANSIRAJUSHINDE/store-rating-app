const express = require('express');
const router = express.Router();
const { signup, login, updatePassword, getMe } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const { body } = require('express-validator');

// src/routes/authRoutes.js

const authController = require('../controllers/authController');

// Debugging: Log the type of each function
console.log("DEBUG: Are these functions?", {
  signup: typeof authController.signup,
  login: typeof authController.login,
  updatePassword: typeof authController.updatePassword,
  getMe: typeof authController.getMe
});

// If any of these print 'undefined', THAT is the function you need to fix in the controller.
// Signup
router.post(
  '/signup',
  [
    body('name').isLength({ min: 3, max: 60 }).withMessage('Name must be between 3-60 chars'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password')
      .isLength({ min: 8, max: 16 }).withMessage('Password 8-16 chars')
      .matches(/[A-Z]/).withMessage('Must contain uppercase')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Must contain special char'),
    body('address').isLength({ max: 400 }).withMessage('Max 400 chars')
  ],
  signup
);

// Login
router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  login
);

// Update password
router.put(
  '/update-password',
  authenticate,
  [
    body('oldPassword').notEmpty(),
    body('newPassword')
      .isLength({ min: 8, max: 16 })
      .matches(/[A-Z]/)
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
  ],
  updatePassword
);

// Get current user
router.get('/me', authenticate, getMe);

module.exports = router;
