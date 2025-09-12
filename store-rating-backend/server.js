const app = require('./src/app');
const { sequelize } = require('./src/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database & tables synced!');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Error syncing database:', err));
