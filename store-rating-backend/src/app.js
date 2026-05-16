const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Updated CORS to allow your exact active Vercel frontend URL
app.use(cors({
  origin: [
    "http://localhost:5173",                          // Allows local development
    "https://store-rating-app-ruddy.vercel.app"       // Your actual live active Vercel link
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS to support preflight checks safely
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]   // Explicitly allows your JWT Bearer tokens to pass through
}));

app.use(express.json());

// Main Routes
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;