const { Model, DataTypes } = require('sequelize');

class Store extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
    this.hasMany(models.Rating, { foreignKey: 'storeId', as: 'ratings' });
  }
}

module.exports = (sequelize) => {
  Store.init(
    {
      name: { type: DataTypes.STRING(60), allowNull: false },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true, validate: { isEmail: true } },
      address: { type: DataTypes.STRING(400), allowNull: false },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      }
    },
    {
      sequelize,
      modelName: 'Store',
      tableName: 'stores',
      timestamps: true
    }
  );

  return Store;
};
