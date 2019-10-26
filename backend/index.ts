import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {genTestOrder} from "./src/bin/orderHelper";
import {generateAccessToken} from "./src/bin/accesTokenGenerator";
import {Equipment} from "./src/entity/Equipment";
import {User} from "./src/entity/User";
import * as UserControl from "./src/controllers/userControl";
import * as AdminControl from "./src/controllers/adminControl";
const dotenv = require('dotenv').config({path: __dirname+'/../.env'});

createConnection().then(async connection => {

    const userRepository = connection.getRepository(User);
    const equipmentRepository = connection.getRepository(Equipment);
    const cookieParser = require('cookie-parser')
    // create and setup express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());
    
    //==================================ADMIN API SECTION==================================
    // admin login view
    app.post("/admin", async function(req: Request, res: Response) {
        return AdminControl.Login(req, res);
    });

    // admin logout view
    app.post("/admin/logout", async function(req: Request, res: Response) {
        return AdminControl.Logout(req, res);
    });
    // admin panel view
    app.get("/admin/panel", async function(req: Request, res: Response) {
        return AdminControl.Panel(req, res);
    });

    // admin users view
    app.get("/admin/users", async function(req: Request, res: Response) {
        return AdminControl.Users(req, res);
    });

    // admin specific user view
    app.get("admin/users/:id", async function(req: Request, res: Response) {
        console.log(req.params.id);
        return AdminControl.UserV(req, res);
    });

    // admin orders view
    app.get("admin/orders", async function(req: Request, res: Response) {
        return AdminControl.Orders(req, res);
    });

    // admin specific order view
    app.get("admin/orders/:id", async function(req: Request, res: Response) {
        return AdminControl.Order(req, res);
    });

    // admin equipments view
    app.get("admin/equipments", async function(req: Request, res: Response) {
        return AdminControl.Equipments(req, res);
    });

    // admin specific equipment view
    app.get("admin/equipments/:id", async function(req: Request, res: Response) {
        return AdminControl.Equipment(req, res);
    });

    // // admin equipment add (provide brands, different parameters) view
    // app.get("admin/equipments/add", async function(req: Request, res: Response) {
    //     return AdminControl.EquipmentAddView(req, res);
    // });

    // // admin equipment add handle
    // app.post("admin/equipments/add", async function(req: Request, res: Response) {
    //     return AdminControl.EquipmentAddHandle(req, res);
    // });

    //==================================USER API SECTION==================================
    // user login handle
    app.post("/login", async function(req: Request, res: Response) {
        return UserControl.Login(req, res);
    });

    // user logout handle
    app.post("/logout", async function(req: Request, res: Response) {
        return UserControl.Logout(req, res);
    });

    // user signup handle 
    app.post("/register", async function(req: Request, res: Response) {
        return UserControl.SignUp(req, res);
    });

    // user profile view
    app.get("/myprofile", async function(req: Request, res: Response) {
        return UserControl.Profile(req, res);
    });

    // user orders view
    app.get("/myprofile/orders", async function(req: Request, res: Response) {
        return UserControl.Orders(req, res);
    });
    
    // user specific order view
    app.get("/myprofile/orders/:id", async function(req: Request, res: Response) {
        return UserControl.Order(req, res);
    });

    // user settings view
    app.get("/myprofile/settings", async function(req: Request, res: Response) {
        return UserControl.SettingsView(req, res);
    });

    // user settings handle
    app.post("/myprofile/settings", async function(req: Request, res: Response) {
        return UserControl.SettingsHandle(req, res);
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


    

    app.get("/equipments/:id", async function(req: Request, res: Response) {
        const results = await equipmentRepository.findOne(req.params.id);
        return res.send(results);
    });

    app.post("/equipments", async function(req: Request, res: Response) {
        const equipment = equipmentRepository.create(req.body);
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
