import express, {Request, Response} from 'express';
import routesUsers from '../routes/users';

class Server {
    private app: express.Application;
    private port: string;
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
        this.listen();
        this.routes();
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
};

export default Server;