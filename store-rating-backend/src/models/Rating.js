const { Model, DataTypes } = require('sequelize');

class Rating extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Store, { foreignKey: 'storeId', as: 'store' });
  }
}

module.exports = (sequelize) => {
  Rating.init(
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'stores', key: 'id' }
      }
    },
    {
      sequelize,
      modelName: 'Rating',
      tableName: 'ratings',
      timestamps: true
    }
  );

  return Rating;
};
