import express, { NextFunction, Request, Response } from 'express';
import routesUsers from '../routes/users';
import routesEvents from '../routes/events';
import db from '../database/connection';
import cors from 'cors';

class Server {
    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
        this.middlewares();
        this.routes();
        this.dbConnect();
        this.listen();
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App running on port ${this.port}`);
        })
    };

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: "Api working"
            })
        })

        this.app.use('/api/users', routesUsers);
        this.app.use('/api/events', routesEvents);
    }

    middlewares() {

        //cors express config
        this.app.use(cors(/*{
            origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowedHeaders: ['Content-Type'],
            preflightContinue: false,
            optionsSuccessStatus: 204,
        }*/));

        //parse the body
        this.app.use(express.json());
        console.log("Middlewares loaded succesfully");
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log("Database connected");
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
};

export default Server;