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

// Optional: test connection once
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Supabase PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ Unable to connect to Supabase DB:", error.message);
  }
})();

module.exports = sequelize;
