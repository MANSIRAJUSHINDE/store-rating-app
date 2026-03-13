// src/middleware/validators.js
const { body } = require('express-validator');

exports.signupValidator = [
  body('name')
    .trim() // Added to remove accidental whitespace
    .isLength({ min: 2, max: 60 }) // Changed min to 2 for better user experience
    .withMessage('Name must be between 2 and 60 characters'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail() // Normalizes email to lowercase (e.g., User@Email.com -> user@email.com)
    .withMessage('Enter a valid email address'),
  body('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be between 8 and 16 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
  body('address')
    .trim()
    .isLength({ max: 400 })
    .withMessage('Address can be maximum 400 characters'),
];

exports.loginValidator = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Enter a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];