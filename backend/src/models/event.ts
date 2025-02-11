import db from '../database/connection';
import { DataTypes } from 'sequelize';

const Event = db.define('Event', {    
    title: {
        type: DataTypes.STRING(255)
    },
    start: {
        type: DataTypes.DATE
    },
    end: {
        type: DataTypes.DATE
    },
    allDay: {
        type: DataTypes.BOOLEAN
    },
    location_id: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.TEXT
    },
    category: {
        type: DataTypes.STRING(50)
    },
    color: {
        type: DataTypes.STRING(7)
    }
},
    {
        tableName: 'events',
        timestamps: true,
        createdAt: "createdat",
        updatedAt: "updatedat"
    });

export default Event;