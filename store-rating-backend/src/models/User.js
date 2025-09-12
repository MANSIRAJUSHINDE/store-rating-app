const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static associate(models) {
    this.hasMany(models.Store, { foreignKey: 'ownerId', as: 'ownedStores' });
    this.hasMany(models.Rating, { foreignKey: 'userId', as: 'ratings' });
  }
}

module.exports = (sequelize) => {
  User.init(
    {
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: { len: [3, 60] } // Admin requirement: 3-60 characters
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(400),
        allowNull: false,
        validate: { len: [0, 400] }
      },
      role: {
        type: DataTypes.ENUM('admin', 'normal', 'store_owner'),
        allowNull: false,
        defaultValue: 'normal'
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true
    }
  );

  return User;
};
