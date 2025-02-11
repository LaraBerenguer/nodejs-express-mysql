import db from '../database/connection';
import { DataTypes } from 'sequelize';

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nickname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    level: {
        type: DataTypes.ENUM('Advanced', 'Beginner')
    }
},
    {
        tableName: 'users',
        timestamps: true,
        createdAt: "createdat",
        updatedAt: "updatedat"
    });

export default User;