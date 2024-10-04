import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Property = sequelize.define('Property', {
    property_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    property_type: {
      type: DataTypes.ENUM('house', 'apartment', 'condo', 'land', 'commercial'),
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'properties',
  });

  Property.associate = (models) => {
    // One-to-Many: A property can have multiple listings
    Property.hasMany(models.Listing, {
      foreignKey: 'property_id',
      as: 'listings',
    });

    // One-to-Many: A property can have multiple reviews
    Property.hasMany(models.Review, {
      foreignKey: 'property_id',
      as: 'reviews',
    });

    // Many-to-Many: Properties can be favorited by multiple users
    Property.belongsToMany(models.User, {
      through: models.Favorite,
      foreignKey: 'property_id',
      as: 'favorited_by',
    });
  };

  return Property;
};