const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// A dynamic whitelist checking mechanism
app.use(cors({
  origin: function (origin, callback) {
    // 1. Allow local development environments or server-to-server requests (no origin)
    if (!origin || origin.startsWith("http://localhost:")) {
      return callback(null, true);
    }
    
    // 2. Dynamic Match: Allow ANY deployment URL matching your Vercel project footprint
    if (origin.includes("mansirajushindes-projects.vercel.app") || origin.includes("store-rating-app")) {
      return callback(null, true);
    }
    
    // Block anything else for security
    return callback(new Error("Blocked by CORS security wrapper"));
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