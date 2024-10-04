import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9\-]+$/,
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'owner', 'user'),
      defaultValue: 'user',
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
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
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'users',
  });

  User.associate = (models) => {
    // One-to-Many: A User can own multiple properties
    User.hasMany(models.Property, {
      foreignKey: 'owner_id',
      as: 'properties',
    });

    // One-to-Many: A User can leave multiple reviews
    User.hasMany(models.Review, {
      foreignKey: 'user_id',
      as: 'reviews',
    });

    // Many-to-Many: Users can favorite multiple properties
    User.belongsToMany(models.Property, {
      through: models.Favorite,
      foreignKey: 'user_id',
      as: 'favorite_properties',
    });
  };

  return User;
};