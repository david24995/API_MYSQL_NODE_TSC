import express, { Application } from "express";

import morgan from "morgan";
import cors from "cors";

import postRoutes from "./routes/post.routes";

export class App {

    private app : Application;

    constructor(private port? : number| string) {
        this.app = express();
        this.setting();
        this.middlewares();
        this.routes();
    }

    setting() {
        this.app.set('port', process.env.PORT || this.port || 3000 );
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    routes() {
        this.app.use('/posts',postRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log(`Servidor en puerto ${this.app.get('port')}`);
    }

}