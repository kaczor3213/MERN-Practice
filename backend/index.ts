import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as salting from "./src/salting";
import {User, UserRole} from "./src/entity/User";
import {Order} from "./src/entity/Order";
import {Equipment} from "./src/entity/Equipment";
const dotenv = require('dotenv').config({path: __dirname+'/../.env'});

createConnection().then(async connection => {

    let user = new User();
    user.firstName = "Andrzej"
    user.lastName = "Bąk"
    user.email = "andrzej.bak@janusze.pl"
    user.password = salting.getSaltedPassword("dupa");
    user.orders = null;
    user.role = UserRole.CLIENT;

    await connection.manager.save(user);

    const userRepository = connection.getRepository(User);

    // create and setup express app
    const app = express();
    app.use(bodyParser.json());

    // register routes

    app.get("/users", async function(req: Request, res: Response) {
        const users = await userRepository.find();
        res.json(users);
    });

    app.get("/users/:id", async function(req: Request, res: Response) {
        const results = await userRepository.findOne(req.params.id);
        return res.send(results);
    });

    app.post("/users", async function(req: Request, res: Response) {
        const user = await userRepository.create(req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });

    app.put("/users/:id", async function(req: Request, res: Response) {
        const user = await userRepository.findOne(req.params.id);
        userRepository.merge(user, req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });

    app.delete("/users/:id", async function(req: Request, res: Response) {
        const results = await userRepository.delete(req.params.id);
        return res.send(results);
    });

    // start express server
    app.listen(3000);
}).catch(error => console.log(error));
