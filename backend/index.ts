import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Equipment} from "./src/entity/Equipment";
import {User} from "./src/entity/User";

import * as AdminControl from "./src/controllers/adminControl";
import * as UserControl from "./src/controllers/userControl";
import * as CommonAccessControl from "./src/controllers/commonAccessControl";

createConnection().then(async connection => {

    const cookieParser = require('cookie-parser')
    // create and setup express app

    const app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
        res.header('Content-Type', 'application/json;charset=UTF-8')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        next();
      });
      
      
    
    //==================================ADMIN API SECTION==================================
    // admin login view
    app.post("/admin", async function(req: Request, res: Response) {
        return AdminControl.Login(req, res);
    });

    // admin panel view
    app.post("/panel", async function(req: Request, res: Response) {
        return AdminControl.Panel(req, res);
    });

    // admin users view
    app.post("/panel/users", async function(req: Request, res: Response) {
        return AdminControl.UsersList(req, res);
    });

    // admin specific user view
    app.post("/panel/users/:id", async function(req: Request, res: Response) {
        return AdminControl.UserDetails(req, res);
    });
    


    // // admin orders view
    // app.get("/panel/orders", async function(req: Request, res: Response) {
    //     return AdminControl.Orders(req, res);
    // });

    // // admin specific order view
    // app.get("/panel/orders/:id", async function(req: Request, res: Response) {
    //     return AdminControl.OrderV(req, res);
    // });

    // admin equipments view
    app.post("/panel/equipment", async function(req: Request, res: Response) {
        return AdminControl.EquipmentList(req, res);
    });

     // admin equipment add (provide brands, different parameters) view
     app.post("/panel/equipment/side/data", async function(req: Request, res: Response) {
        return AdminControl.EquipmentSideData(req, res);
    });
    
     // admin equipment add handle
     app.post("/panel/equipment/add", async function(req: Request, res: Response) {
        return AdminControl.EquipmentAdd(req, res);
    });

    // admin specific equipment view
    app.post("/panel/equipment/:id", async function(req: Request, res: Response) {
        return AdminControl.EquipmentDetails(req, res);
    });

    app.post("/panel/equipment/edit/:id", async function(req: Request, res: Response) {
        return AdminControl.EquipmentUpdate(req, res);
    });



    // admin equipment add handle
    app.post("/panel/equipment/delete/:id", async function(req: Request, res: Response) {
        return AdminControl.EquipmentDelete(req, res);
    });

    //==================================USER API SECTION==================================
    // user login handle
    app.post("/login", async function(req: Request, res: Response) {
        return UserControl.Login(req, res);
    });

    // user signup handle 
    app.post("/register", async function(req: Request, res: Response) {
        return UserControl.SignUp(req, res);
    });

    // user profile view
    app.post("/myprofile", async function(req: Request, res: Response) {
        return UserControl.Profile(req, res);
    });

    // // user orders view
    // app.get("/myprofile/orders", async function(req: Request, res: Response) {
    //     return UserControl.Orders(req, res);
    // });
    
    // // user specific order view
    // app.get("/myprofile/orders/:id", async function(req: Request, res: Response) {
    //     return UserControl.Order(req, res);
    // });

    // user settings view
    app.get("/myprofile/settings", async function(req: Request, res: Response) {
        return UserControl.SettingsView(req, res);
    });

    // user settings handle
    app.post("/myprofile/settings", async function(req: Request, res: Response) {
        return UserControl.SettingsHandle(req, res);
    });
    

    //==================================COMMON_ACCESS API SECTION==================================

    // root view
    app.get("/", async function(req: Request, res: Response) {
        return CommonAccessControl.Root(req, res);
    });

    // search equipment view
    app.post("/search", async function(req: Request, res: Response) {
        return CommonAccessControl.Search(req, res);
    });
    
    // equipment view
    app.get("/equipment", async function(req: Request, res: Response) {
        return CommonAccessControl.Equipments(req, res);
    });

    // equipment view
    app.get("/equipment/:id", async function(req: Request, res: Response) {
        return CommonAccessControl.EquipmentSpecific(req, res);
    });

    // brands view
    app.get("/brands", async function(req: Request, res: Response) {
        return CommonAccessControl.Brands(req, res);
    });

    // equipment_types view
    app.get("/equipment_types", async function(req: Request, res: Response) {
        return CommonAccessControl.EquipmentTypes(req, res);
    });

    // start express server
    app.listen(4000);
}).catch(error => console.log(error));
