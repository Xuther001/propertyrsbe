import { DataTypes } from 'sequelize';
import UserProperty from './UserProperty.js';

export default (sequelize) => {
  const Property = sequelize.define(
    'Property',
    {
      property_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.STRING,
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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      lot_size: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      year_built: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hoa_fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: 'HOA fee, if any',
      },
      property_features: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Example: {"open_floorplan": true, "kitchen_island": true}',
      },
      flooring: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Example: ["carpet", "tile"]',
      },
      has_fireplace: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      fireplace_features: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      view_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parking: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Example: {"garage": 2, "driveway": 1}',
      },
      utilities: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Example: {"water": "public", "electric": "underground"}',
      },
      taxes: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
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
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'properties',
    }
  );

  Property.associate = (models) => {
    Property.belongsToMany(models.User, {
      through: UserProperty,
      foreignKey: 'property_id',
      otherKey: 'user_id',
      onDelete: 'CASCADE',
    });

    Property.hasMany(models.Review, {
      foreignKey: 'property_id',
      onDelete: 'CASCADE',
    });

    Property.hasMany(models.Listing, {
      foreignKey: 'property_id',
      onDelete: 'CASCADE',
    });

    Property.hasMany(models.PropertyImage, {
      foreignKey: 'property_id',
      as: 'images',
      onDelete: 'CASCADE',
    });
  };

  return Property;
};