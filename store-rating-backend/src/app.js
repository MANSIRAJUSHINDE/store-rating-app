// src/app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Routes
const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Auth middleware
const { authenticate } = require("./middleware/authMiddleware");

// Middleware
app.use(express.json());

// ✅ Enhanced CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", 
  process.env.FRONTEND_URL // Ensure this is set in your production dashboard
].filter(Boolean); // Filters out undefined if ENV is missing

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/admin", adminRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("✅ Store Rating API is running");
});

// Protected test route
app.get("/api/protected", authenticate, (req, res) => {
  res.json({
    message: `Welcome ${req.user.name}! This is a protected route.`,
  });
});

// ✅ Global Error Handler (Crucial for Production)
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);
  res.status(500).json({ 
    message: "Something went wrong on the server!",
    error: process.env.NODE_ENV === 'development' ? err.message : "Internal Server Error"
  });
});

module.exports = app;