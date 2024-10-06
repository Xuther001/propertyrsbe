// models/Listing.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Listing = sequelize.define('Listing', {
    listing_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    is_for_sale: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    available_from: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'listings',
  });

  Listing.associate = (models) => {
    Listing.belongsTo(models.Property, {
      foreignKey: 'property_id',
      as: 'property',
    });
  };

  return Listing;
};