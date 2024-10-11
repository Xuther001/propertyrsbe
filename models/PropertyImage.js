import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const PropertyImage = sequelize.define('PropertyImage', {
    image_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    property_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'properties',
        key: 'property_id',
      },
      onDelete: 'CASCADE',
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'gallery',
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
    tableName: 'property_images',
  });

  PropertyImage.associate = (models) => {
    PropertyImage.belongsTo(models.Property, {
      foreignKey: 'property_id',
      onDelete: 'CASCADE',
    });
  };

  return PropertyImage;
};