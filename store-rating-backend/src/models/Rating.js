const { Model, DataTypes } = require("sequelize");

class Rating extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Store, {
      foreignKey: "storeId",
      as: "store",
      onDelete: "CASCADE",
    });
  }
}

module.exports = (sequelize) => {
  Rating.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      storeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "stores",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Rating",
      tableName: "ratings",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["userId", "storeId"], // user can rate a store only once
        },
      ],
    }
  );

  return Rating;
};
