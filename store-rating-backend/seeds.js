require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, User, Store, Rating } = require('./src/models');

const seedDatabase = async () => {
  try {
    // ✅ Ensure DB tables exist
    await sequelize.sync({ force: false });

    // --------------------------
    // 1️⃣ Create Admin
    // --------------------------
    let admin = await User.findOne({ where: { email: 'admin@example.com' } });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      admin = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        address: '123 Admin Street, City, Country',
        role: 'admin',
      });
      console.log('Admin created:', admin.name);
    } else {
      console.log('Admin already exists:', admin.name);
    }

    // --------------------------
    // 2️⃣ Create Store Owner
    // --------------------------
    let owner = await User.findOne({ where: { email: 'owner@example.com' } });
    if (!owner) {
      const hashedPassword = await bcrypt.hash('Owner@123', 10);
      owner = await User.create({
        name: 'Store Owner',
        email: 'owner@example.com',
        password: hashedPassword,
        address: '456 Owner Street, City, Country',
        role: 'store_owner',
      });
      console.log('Store owner created:', owner.name);
    } else {
      console.log('Store owner already exists:', owner.name);
    }

    // --------------------------
    // 3️⃣ Create Stores for Store Owner
    // --------------------------
    const storesData = [
      {
        name: 'Tech Gadgets',
        email: 'techgadgets@example.com',
        address: '101 Tech Street, City, Country',
        ownerId: owner.id,
      },
      {
        name: 'Fashion Hub',
        email: 'fashionhub@example.com',
        address: '202 Fashion Avenue, City, Country',
        ownerId: owner.id,
      },
    ];

    for (const storeData of storesData) {
      const existingStore = await Store.findOne({ where: { email: storeData.email } });
      if (!existingStore) {
        await Store.create(storeData);
        console.log('Store created:', storeData.name);
      } else {
        console.log('Store already exists:', storeData.name);
      }
    }

    // --------------------------
    // 4️⃣ Create Sample Ratings
    // --------------------------
    const users = [admin, owner]; // For simplicity, admin and owner rate stores
    const stores = await Store.findAll();

    for (const store of stores) {
      for (const user of users) {
        const existingRating = await Rating.findOne({
          where: { userId: user.id, storeId: store.id },
        });
        if (!existingRating) {
          await Rating.create({
            userId: user.id,
            storeId: store.id,
            rating: Math.floor(Math.random() * 5) + 1, // Random 1-5
          });
          console.log(`Rating created by ${user.name} for store ${store.name}`);
        }
      }
    }

    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
