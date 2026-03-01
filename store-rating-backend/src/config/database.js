// config/database.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create Sequelize instance for MySQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",       // ✅ MySQL dialect
  logging: false,         // Disable SQL logging
});

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
  }
})();

module.exports = sequelize;