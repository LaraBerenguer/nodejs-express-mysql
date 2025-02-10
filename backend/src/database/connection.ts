//import { Sequelize } from "sequelize";
const { Sequelize } = require("sequelize");
import dotenv from "dotenv";

dotenv.config();

/*const sequelize = new Sequelize('findgames', 'root', process.env.DB_PASS as string, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3301
});*/

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Importante para Render
        },
    },
});

sequelize
    .authenticate()
    .then(() => console.log("Succesfully connected to DB"))
    .catch((error: Error) => console.error("Error connecting to DB:", error));

export default sequelize;