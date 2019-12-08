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
    app.get("/admin/users/:id", async function(req: Request, res: Response) {
        console.log(req.params.id);
        return AdminControl.UserV(req, res);
    });

    // admin orders view
    app.get("/admin/orders", async function(req: Request, res: Response) {
        return AdminControl.Orders(req, res);
    });

    // admin specific order view
    app.get("/admin/orders/:id", async function(req: Request, res: Response) {
        return AdminControl.OrderV(req, res);
    });

    // admin equipments view
    app.get("/admin/equipment", async function(req: Request, res: Response) {
        return AdminControl.Equipments(req, res);
    });

    // admin specific equipment view
    app.get("/admin/equipment/:id", async function(req: Request, res: Response) {
        return AdminControl.EquipmentV(req, res);
    });

    // admin equipment add (provide brands, different parameters) view
    app.get("admin/equipments/add", async function(req: Request, res: Response) {
        return AdminControl.EquipmentAddView(req, res);
    });

    // admin equipment add handle
    app.post("admin/equipments/add", async function(req: Request, res: Response) {
        return AdminControl.EquipmentAddHandle(req, res);
    });

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
    app.post("/myprofile", async function(req: Request, res: Response) {
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

    // brands view
    app.get("/brands", async function(req: Request, res: Response) {
        return CommonAccessControl.Brands(req, res);
    });

    // equipment for specific brand view
    app.get("/equipment/brand/:brand", async function(req: Request, res: Response) {
        return CommonAccessControl.EquipmentOfSpecificBrand(req, res);
    });

    // equipment_types view
    app.get("/equipment_types", async function(req: Request, res: Response) {
        return CommonAccessControl.EquipmentTypes(req, res);
    });

    // equipment_types view
    app.get("/equipment/category/:type", async function(req: Request, res: Response) {
        return CommonAccessControl.EquipmentOfSpecificType(req, res);
    });



    // start express server
    app.listen(4000);
}).catch(error => console.log(error));
