import express, { NextFunction, Request, Response } from 'express';
import routesUsers from '../routes/users';
import db from '../database/connection';

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
        //manual cors        
        const ACCEPTED_ORIGINS = [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:2104',
            'http://localhost:5173',
        ];
        
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const origin = req.header('Origin');
        
            if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
                res.header('Access-Control-Allow-Origin', origin);
                res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
                res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            }
    
            if (req.method === 'OPTIONS') {                
                res.status(200).end();
                return;
            }
    
            next();
        });
        
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