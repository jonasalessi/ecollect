import express from 'express';
import routes from './routers'
import path from 'path';
import cors from 'cors';

class App {
    app: express.Application;

    constructor() {
        this.app = express();
        this.middleware();
        this.router()
        this.assets();
    }

    assets() {
        this.app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    router() {
        this.app.use(routes);
    }

    get express(): express.Application {
        return this.express;
    }
}

export default new App().app;