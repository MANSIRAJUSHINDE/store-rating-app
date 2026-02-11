const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { authenticate } = require("./middleware/authMiddleware");

// Middleware
app.use(express.json());

// ✅ CORS (works for localhost + Vercel)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL, // Vercel URL
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);

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

module.exports = app;
