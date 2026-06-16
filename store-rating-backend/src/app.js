const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Dynamic CORS configuration to allow local work and all your Vercel deployments
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.startsWith("http://localhost:")) {
      return callback(null, true);
    }

    if (
      origin === "https://store-rating-app-ruddy.vercel.app"
    ) {
      return callback(null, true);
    }

    return callback(new Error("Blocked by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Main Routes
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;