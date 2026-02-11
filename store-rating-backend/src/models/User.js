const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static associate(models) {
    this.hasMany(models.Store, {
      foreignKey: "ownerId",
      as: "ownedStores",
      onDelete: "CASCADE",
    });

    this.hasMany(models.Rating, {
      foreignKey: "userId",
      as: "ratings",
      onDelete: "CASCADE",
    });
  }

  comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: { len: [3, 60] },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "normal", "store_owner"),
        allowNull: false,
        defaultValue: "normal",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  return User;
};
