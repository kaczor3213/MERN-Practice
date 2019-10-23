import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as salting from "./src/bin/salting";
import {generateAccessToken} from "./src/bin/accesTokenGenerator";
import {Order} from "./src/entity/Order";
import {Equipment} from "./src/entity/Equipment";
import {User} from "./src/entity/User";
import * as UserControl from "./src/controllers/userControl";
const dotenv = require('dotenv').config({path: __dirname+'/../.env'});

createConnection().then(async connection => {

    const userRepository = connection.getRepository(User);
    const equipmentRepository = connection.getRepository(Equipment);

    // create and setup express app
    const app = express();
    app.use(bodyParser.json());
    
    // register routes
    // user routes
    // restricted view
    app.get("/admin", async function(req: Request, res: Response) {
        const users = await userRepository.find();
        res.json(users);
    });

    app.get("/admin/users", async function(req: Request, res: Response) {
        req.cookies
        const users = await userRepository.find();
        res.json(users);
    });

    // restricted view
    app.get("admin/users/:id", async function(req: Request, res: Response) {
        const results = await userRepository.findOne(req.params.id);
        return res.send(results);
    });

    // handle login user
    app.post("/login", async function(req: Request, res: Response) {
        return UserControl.Login(req, res);
    });

    // handle signup page
    app.post("/register", async function(req: Request, res: Response) {
        return UserControl.SignUp(req, res);
    });

    //myprofile
    app.get("/myprofile", async function(req: Request, res: Response) {
        const user = await userRepository.find(req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });


    app.get("/equipments", async function(req: Request, res: Response) {
        const equipments = await equipmentRepository.find();
        res.json(equipments);
    });

    app.get("admin/equipments/add", async function(req: Request, res: Response) {
        let equipment = new Equipment();

        equipmentRepository.save(equipment)
        const users = await equipmentRepository.find();
        res.json(users);
    });


    app.post("admin/equipments/add", async function(req: Request, res: Response) {
        let equipment = new Equipment();

        equipmentRepository.save(equipment)
        const users = await equipmentRepository.find();
        res.json(users);
    });

    app.get("/equipments/:id", async function(req: Request, res: Response) {
        const results = await equipmentRepository.findOne(req.params.id);
        return res.send(results);
    });

    app.post("/equipments", async function(req: Request, res: Response) {
        const equipment = await equipmentRepository.create(req.body);
        const results = await equipmentRepository.save(equipment);
        return res.send(results);
    });

    app.put("/equipments/:id", async function(req: Request, res: Response) {
        const equipment = await userRepository.findOne(req.params.id);
        userRepository.merge(equipment, req.body);
        const results = await equipmentRepository.save(equipment);
        return res.send(results);
    });

    app.delete("/equipments/:id", async function(req: Request, res: Response) {
        const results = await equipmentRepository.delete(req.params.id);
        return res.send(results);
    });

    // start express server
    app.listen(4000);
}).catch(error => console.log(error));
