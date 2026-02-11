const { Model, DataTypes } = require("sequelize");

class Store extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "ownerId",
      as: "owner",
      onDelete: "CASCADE",
    });

    this.hasMany(models.Rating, {
      foreignKey: "storeId",
      as: "ratings",
      onDelete: "CASCADE",
    });
  }
}

module.exports = (sequelize) => {
  Store.init(
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
      address: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Store",
      tableName: "stores",
      timestamps: true,
      indexes: [{ fields: ["ownerId"] }],
    }
  );

  return Store;
};
