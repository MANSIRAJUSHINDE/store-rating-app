// seed.js (or wherever your main seed script is)
require('dotenv').config();
const bcrypt = require('bcryptjs'); // Use bcryptjs
const { sequelize, User, Store } = require('./src/models');

const seedDatabase = async () => {
  try {
    console.log('⏳ Starting database seeding...');
    await sequelize.sync({ force: false });

    // 1. Create Admin
    let admin = await User.findOne({ where: { email: 'admin@example.com' } });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      admin = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        address: '123 Admin Street',
        role: 'admin',
      });
      console.log('✅ Admin created');
    }

    console.log('✅ Seeding finished successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();