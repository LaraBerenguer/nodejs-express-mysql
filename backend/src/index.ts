import Server from "./models/server";
import dotenv from 'dotenv';

//env variables config
dotenv.config();

console.log("Starting the server...");
const server = new Server();
console.log("Server instance created.");
server.init();
console.log("Server initialized.");
