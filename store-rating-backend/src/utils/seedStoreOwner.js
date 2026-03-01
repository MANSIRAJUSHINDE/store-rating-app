const bcrypt = require("bcrypt");
const { User, Store, sequelize } = require("../models");
require("dotenv").config();

async function seedStoreOwner() {
  try {
    await sequelize.sync({ force: false });

    let owner = await User.findOne({ where: { email: "owner@example.com" } });
    if (!owner) {
      const hashedPassword = await bcrypt.hash("Owner@123", 10);
      owner = await User.create({
        name: "Super Store Owner",
        email: "owner@example.com",
        password: hashedPassword,
        address: "789 Owner Street, City, Country",
        role: "store_owner",
      });
      console.log("Store owner created:", owner.name);
    } else {
      console.log("Store owner already exists:", owner.name);
    }

    const storesData = [
      { name: "SuperMart", email: "supermart@example.com", address: "456 Market Street", ownerId: owner.id },
      { name: "Tech Gadgets", email: "techgadgets@example.com", address: "101 Tech Street", ownerId: owner.id },
      { name: "Fashion Hub", email: "fashionhub@example.com", address: "202 Fashion Avenue", ownerId: owner.id },
    ];

    for (const storeData of storesData) {
      const existingStore = await Store.findOne({ where: { email: storeData.email } });
      if (!existingStore) {
        const store = await Store.create(storeData);
        console.log("Store created:", store.name);
      } else {
        console.log("Store already exists:", existingStore.name);
      }
    }

    console.log("✅ Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seedStoreOwner();