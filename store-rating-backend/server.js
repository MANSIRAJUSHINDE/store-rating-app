require('dotenv').config(); // Moved to the top to ensure variables load first
const app = require('./src/app');
const { sequelize } = require('./src/db');

// Use the environment variable PORT provided by the hosting service (Render/Railway)
const PORT = process.env.PORT || 5000;

// Sync database and start server
// Note: { alter: true } is fine for development, but be careful in production 
// as it modifies your actual cloud database schema.
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database & tables synced!');
    
    // Changed: Removed "http://localhost" from the log. 
    // In production, your URL will be something like https://your-app.onrender.com
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is live on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error syncing database:', err);
    // In production, we don't always want to crash, 
    // but for initial setup, this helps catch connection errors immediately.
    process.exit(1); 
  });