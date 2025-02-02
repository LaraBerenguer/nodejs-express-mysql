import db from '../database/connection';
import { DataTypes } from 'sequelize';

const User = db.define('User', {
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
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    });

export default User;