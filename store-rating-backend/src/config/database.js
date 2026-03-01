const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create Sequelize instance for MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  logging: false,
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