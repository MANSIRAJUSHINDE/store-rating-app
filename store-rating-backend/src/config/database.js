const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create Sequelize instance for MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false, // Set to console.log if you want to see SQL queries during debugging
    
    // CRITICAL FOR DEPLOYMENT:
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // This allows connecting to cloud DBs without local certificates
      },
    },
    
    // Connection Pool settings (Helps manage performance on free/low-tier hosting)
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Cloud MySQL connected successfully");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
  }
})();

module.exports = sequelize;