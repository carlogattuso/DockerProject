"use strict";
exports.__esModule = true;
var express_1 = require("express");
require('../models/user');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    UserRouter.prototype.routes = function () {
        this.router.get('/all', this.GetUsers);
        this.router.get('/:id', this.GetUserById);
        this.router.post('/', this.CreateUser);
        this.router.put('/:id', this.UpdateUser);
        this.router["delete"]('/:id', this.DeleteUser);
    };
    UserRouter.prototype.GetUsers = function (req, res) {
        User.find({}).then(function (data) {
            var status = 200;
            if (data == null)
                status = 404;
            res.status(200).json(data);
        })["catch"](function (err) {
            res.status(500).json(err);
        });
    };
    UserRouter.prototype.GetUserById = function (req, res) {
        var id = req.params.id;
        User.findOne({ "_id": id })
            .then(function (data) {
            res.status(200).json(data);
        })["catch"](function (err) {
            res.status(500).json(err);
        });
    };
    UserRouter.prototype.CreateUser = function (req, res) {
        var email = req.body.email;
        var name = req.body.name;
        var pass = req.body.pass;
        var user = new User({ email: email, name: name, pass: pass });
        user.save()
            .then(function (data) {
            res.status(201).json(data);
        })["catch"](function (err) {
            res.status(500).json(err);
        });
    };
    UserRouter.prototype.UpdateUser = function (req, res) {
        var id = req.params.id;
        var email = req.body.email;
        var name = req.body.name;
        var pass = req.body.pass;
        User.update({ "_id": id }, { $set: { "email": email, "name": name, "pass": pass } })
            .then(function (data) {
            res.status(201).json(data);
        })["catch"](function (err) {
            res.status(500).json(err);
        });
    };
    UserRouter.prototype.DeleteUser = function (req, res) {
        var id = req.params.id;
        User.deleteOne({ "_id": id })
            .then(function (data) {
            res.status(200).json(data);
        })["catch"](function (err) {
            res.status(500).json(err);
        });
    };
    return UserRouter;
}());
var userRoutes = new UserRouter();
userRoutes.routes();
exports["default"] = userRoutes.router;
