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
    // A Property belongs to many Users through user_properties
    Property.belongsToMany(models.User, {
      through: 'user_properties',  // Specify the join table
      foreignKey: 'property_id',
      otherKey: 'user_id',
    });

    // Other associations
  };

  return Property;
};