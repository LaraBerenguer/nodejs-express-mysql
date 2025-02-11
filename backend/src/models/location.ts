import db from '../database/connection';
import { DataTypes } from 'sequelize';

const Location = db.define('Location', {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    place: {
        type: DataTypes.ENUM('Shop', 'Private Table'),
        allowNull: false,
    },
    lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
},
    {
        tableName: 'locations',
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    });

export default Location;