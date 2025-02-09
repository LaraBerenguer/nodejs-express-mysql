import express, { Request, Response } from 'express';
import routesUsers from '../routes/users';
import routesEvents from '../routes/events';
import routesLocations from '../routes/locations';
import db from '../database/connection';
import cors from 'cors';

class Server {
    private readonly app: express.Application;
    private readonly port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
        this.middlewares();
        this.routes();
        this.init();
        this.listen();
    };

    async init () {
        await this.dbConnect();
    }

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
        this.app.use('/api/locations', routesLocations);    
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

        //print backend petitions     
        this.app.use((req, res, next) => {
            console.log(`Petición recibida: ${req.method} ${req.url}`);
            next();
        });

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