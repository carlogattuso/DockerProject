import express = require('express');
import mongoose = require('mongoose');
import bodyParser = require('body-parser');

import UserRouter from './routes/users';

class Server {
    public app:express.Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    public config() {
        mongoose.connect("mongodb://mongo:27017/dockerApp", {
            useNewUrlParser: true,
            reconnectTries : Number.MAX_VALUE,
            autoReconnect : true,
            useUnifiedTopology: true,
            reconnectInterval: 500
        }).then(() => {
            console.log('Connected successfully to DB');
        })
        .catch(error => {
            console.error('Connection to DB Failed');
            console.error(error.message);
            process.exit(-1);
        });
        this.app.use(bodyParser.json());
    }

    public routes():void {

        let router: express.Router;
        router = express.Router();
        this.app.get('/', (req,res) => {
            res.send("App Working");
        });
        this.app.use('/', router);
        this.app.use('/users', UserRouter);
    }
}

export default new Server().app;
