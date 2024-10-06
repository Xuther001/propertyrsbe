// models/Review.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Review = sequelize.define('Review', {
    review_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'reviews',
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Review.belongsTo(models.Property, {
      foreignKey: 'property_id',
      as: 'property',
    });
  };

  return Review;
};