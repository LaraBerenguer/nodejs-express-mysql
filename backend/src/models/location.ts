import db from '../database/connection';
import { DataTypes } from 'sequelize';

const Location = db.define('Location', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
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
        createdAt: "createdat",
        updatedAt: "updatedat"
    });

export default Location;