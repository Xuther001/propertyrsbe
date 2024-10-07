// models/Favorite.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Favorite = sequelize.define('Favorite', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
      primaryKey: true,
    },
    property_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'properties',
        key: 'property_id',
      },
      primaryKey: true,
    },
  }, {
    timestamps: false,
    tableName: 'favorites',
  });

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, { foreignKey: 'user_id' });
    Favorite.belongsTo(models.Property, { foreignKey: 'property_id' });
  };

  return Favorite;
};