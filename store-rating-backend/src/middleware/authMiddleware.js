const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.authenticate = async (req, res, next) => {
  try {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({ message: 'Authorization header missing' });

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') 
      return res.status(401).json({ message: 'Invalid token format. Use Bearer <token>' });

    const token = parts[1];
    
    // Use process.env.JWT_SECRET (ensure this is set in your Render dashboard!)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (error) {
    // Distinguish between expired and other errors for better debugging
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired, please log in again.' });
    }
    console.error('Authentication error:', error.message);
    res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Check if req.user exists (set by the authenticate middleware)
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};