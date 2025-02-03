import express, { NextFunction, Request, Response } from 'express';
import routesUsers from '../routes/users';
import db from '../database/connection';
import cors from 'cors';

class Server {
    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
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

        this.app.use('/api/users', routesUsers)
    }

    middlewares() {

        //cors express config       
        const corsOptions = {
            origin: ['http://localhost:3000', 'http://localhost:5173'],
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowedHeaders: ['Content-Type'],
            preflightContinue: false,
            optionsSuccessStatus: 204,
        }

        this.app.use(cors())

        //parse the body
        this.app.use(express.json())
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