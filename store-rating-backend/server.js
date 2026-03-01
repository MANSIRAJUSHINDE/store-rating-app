const app = require("./src/app");
const sequelize = require("./src/config/database");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Sync database and start server
(async () => {
  try {
    await sequelize.sync(); // ❗ no alter in production
    console.log("✅ Database & tables synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database sync failed:", error);
    process.exit(1);
  }
})();