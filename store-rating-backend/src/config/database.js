const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // required for Railway / Supabase
    },
  },
});

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
  }
})();

module.exports = sequelize;