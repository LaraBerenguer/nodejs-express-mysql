import Server from "./models/server";
import dotenv from 'dotenv';

//env variables config
dotenv.config();

const server = new Server();
server.init();
