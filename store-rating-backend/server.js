require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models'); 

const PORT = process.env.PORT || 5000;

// Sync database and start server
sequelize.sync({ alter: false }) 
  .then(() => {
    console.log('✅ Database & tables synced!');
    
    // Binding to 0.0.0.0 is mandatory for Render/Cloud environments
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is live on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error syncing database:', err);
    // Exit process with failure if DB connection fails
    process.exit(1); 
  });