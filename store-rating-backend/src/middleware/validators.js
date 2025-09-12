// src/middleware/validators.js
const { body } = require('express-validator');

exports.signupValidator = [
  body('name')
    .isLength({ min: 20, max: 60 })
    .withMessage('Name must be between 20 and 60 characters'),
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
];

exports.loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Enter a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];
