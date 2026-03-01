// server.js
const app = require("./src/app");
const sequelize = require("./src/config/database");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Start server first
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  try {
    await sequelize.sync(); // sync DB in background
    console.log("✅ Database & tables synced");
  } catch (error) {
    console.error("❌ Database sync failed:", error);
  }
});