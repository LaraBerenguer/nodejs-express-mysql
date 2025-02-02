import express, { Request, Response } from 'express';
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
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: "Api working"
            })
        })

        this.app.use('/api/users', routesUsers)
    }

    //parse the body
    middlewares() {
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