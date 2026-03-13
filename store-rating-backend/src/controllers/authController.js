const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// ✅ Login function
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(err => err.msg).join(", ") });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // CRITICAL: Ensure JWT_SECRET is set in your hosting provider's Environment Variables
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables!");
      return res.status(500).json({ message: 'Internal server configuration error' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// All other functions (signup, updatePassword, getMe) look good!
// Just ensure your authMiddleware properly sets 'req.user' for getMe and updatePassword.