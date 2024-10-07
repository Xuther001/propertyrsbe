import { DataTypes } from 'sequelize';
import UserProperty from './UserProperty.js';

export default (sequelize) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'users',
  });

  User.associate = (models) => {
    User.belongsToMany(models.Property, {
      through: UserProperty, // Use imported UserProperty model here
      foreignKey: 'user_id',
      otherKey: 'property_id',
      onDelete: 'CASCADE',
    });

    User.hasMany(models.Review, { foreignKey: 'user_id' });
    User.hasMany(models.Favorite, { foreignKey: 'user_id' });
  };

  return User;
};