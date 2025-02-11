import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

//LOCAL
/*const sequelize = new Sequelize('findgames', 'root', process.env.DB_PASS as string, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3301
});*/

// Validate DATABASE_URL exists
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
}

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
        },
    },
});

sequelize
    .authenticate()
    .then(() => console.log("Succesfully connected to DB"))
    .catch((error: Error) => console.error("Error connecting to DB:", error));

export default sequelize;