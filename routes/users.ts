import { Router, Request, Response, NextFunction } from 'express';
require('../models/user');
let mongoose = require('mongoose');
let User = mongoose.model('User');

class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/all',  this.GetUsers);
        this.router.get('/:id',  this.GetUserById);
        this.router.post('/', this.CreateUser);
        this.router.put('/:id', this.UpdateUser);
        this.router.delete('/:id', this.DeleteUser);
    }

    public GetUsers(req: Request, res: Response): void {
        User.find({}).then((data:any) => {
                let status = 200;
                if(data == null) status = 404;
                res.status(200).json(data);
            }).catch((err:any) => {
                res.status(500).json(err);
            })
    }

    public GetUserById(req: Request, res: Response): void {
        const id:string = req.params.id;

        User.findOne({ "_id": id })
            .then((data:any) => {
                res.status(200).json(data);
            })
            .catch((err:any) => {
                res.status(500).json(err);
            })
    }

    public CreateUser(req: Request, res: Response): void {

        const email: string = req.body.email;
        const name: string = req.body.name;
        const pass: string = req.body.pass;

        const user = new User({email, name, pass});

        user.save()
            .then((data: any) => {
                res.status(201).json(data);
            })
            .catch((err: any) => {
                res.status(500).json(err);
            })
    }

    public UpdateUser(req: Request, res: Response): void {

        const id: string = req.params.id;
        const email: string = req.body.email;
        const name: string = req.body.name;
        const pass: string = req.body.pass;

        User.update({"_id": id}, {$set: {"email": email, "name": name, "pass": pass}})
            .then((data:any) => {
                res.status(201).json(data);
            })
            .catch((err:any) => {
                res.status(500).json(err);
            })
    }

    public DeleteUser(req: Request, res: Response): void {

        const id: string = req.params.id;

        User.deleteOne({"_id": id})
            .then((data:any) => {
                res.status(200).json(data);
            })
            .catch((err:any) => {
                res.status(500).json(err);
            })
    }

}

const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;
