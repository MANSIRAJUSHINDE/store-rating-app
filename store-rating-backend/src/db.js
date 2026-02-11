const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // required for Supabase
    },
  },
});

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Supabase PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ Unable to connect to Supabase DB:", error);
  }
})();

module.exports = sequelize;
