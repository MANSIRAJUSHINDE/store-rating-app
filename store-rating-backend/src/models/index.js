const sequelize = require("../config/database");

const UserModel = require("./User");
const StoreModel = require("./Store");
const RatingModel = require("./Rating");

// Initialize models
const User = UserModel(sequelize);
const Store = StoreModel(sequelize);
const Rating = RatingModel(sequelize);

// Set up associations
User.associate({ Store, Rating });
Store.associate({ User, Rating });
Rating.associate({ User, Store });

// Export everything
module.exports = {
  sequelize,
  User,
  Store,
  Rating,
};
