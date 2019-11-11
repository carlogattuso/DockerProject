"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var users_1 = require("./routes/users");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        mongoose.connect("mongodb://mongo:27017/dockerApp", {
            useNewUrlParser: true,
            reconnectTries: Number.MAX_VALUE,
            autoReconnect: true,
            useUnifiedTopology: true,
            reconnectInterval: 500
        }).then(function () {
            console.log('Connected successfully to DB');
        })["catch"](function (error) {
            console.error('Connection to DB Failed');
            console.error(error.message);
            process.exit(-1);
        });
        this.app.use(bodyParser.json());
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        this.app.get('/', function (req, res) {
            res.send("App Working");
        });
        this.app.use('/', router);
        this.app.use('/users', users_1["default"]);
    };
    return Server;
}());
exports["default"] = new Server().app;
