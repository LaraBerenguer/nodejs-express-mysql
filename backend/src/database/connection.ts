import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize('findgames', 'root', process.env.DB_PASS as string, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3301
});

export default sequelize;