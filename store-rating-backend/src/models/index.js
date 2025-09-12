const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const StoreModel = require('./Store');
const RatingModel = require('./Rating');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

// Initialize models
const User = UserModel(sequelize);
const Store = StoreModel(sequelize);
const Rating = RatingModel(sequelize);

// Set up associations
User.associate({ Store, Rating });
Store.associate({ User, Rating });
Rating.associate({ User, Store });

// Export models and sequelize instance
module.exports = { sequelize, User, Store, Rating };
