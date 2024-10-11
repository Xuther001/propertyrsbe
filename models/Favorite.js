import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Favorite = sequelize.define('Favorite', {
    favorite_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    property_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'properties',
        key: 'property_id',
      },
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'listings',
        key: 'listing_id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: true,
    tableName: 'favorites',
  });

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, { foreignKey: 'user_id' });
    Favorite.belongsTo(models.Property, { foreignKey: 'property_id' });
    Favorite.belongsTo(models.Listing, { foreignKey: 'listing_id' });
  };

  return Favorite;
};