import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const UserProperty = sequelize.define('UserProperty', {
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
        allowNull: false,
        references: {
            model: 'properties',
            key: 'property_id',
        },
    },
}, {
    tableName: 'user_properties',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default UserProperty;