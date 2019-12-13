import {validateAdminLogin, validateAdminLoginToken} from "../validators/adminValidator";
import {generateHashedToken} from "../bin/loginToken";
import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {User, UserRole} from "../entity/User";
import {Order} from "../entity/Order";
import {Equipment, EquipmentType, TyreType, Brand} from "../entity/Equipment";
import { validateEquipmentCreate } from "../validators/equipmentValidator";
export const LOGIN_TIMEOUT = 60 * 60 * 1000;

// Login controller (takes request, response from route call)
export const Login = async (req: Request, res: Response) => {
    const results = await validateAdminLogin(req.body);
    if(results["TOTAL_WARNINGS"] == 0) {
        let hashedToken = generateHashedToken(results["EMAIL"], req.headers["user-agent"], 'ADMIN_KEY');
        res.cookie("adminLoginToken", hashedToken, { expires: new Date(Date.now() + LOGIN_TIMEOUT), httpOnly: true});
    }
    return res.json(results);
}

// Panel controller (takes request, response from route call)
export const Panel = async (req: Request, res: Response) => {
    let results = await validateAdminLoginToken(req.cookies);
    const users_count = await getConnection().getRepository(User).count();     
    const equipment_count = await getConnection().getRepository(Equipment).count();     
    const order_7days = await getConnection().getRepository(Order).count();
    if(results["IS_VALID"] == true ) {
        results['users_count']=users_count;
        results['equipment_count']=equipment_count;
        results['orders_7days']=order_7days;
    }
    return res.json(results);
}

// Users controller (takes request, response from route call)
export const Users = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);     
    const results = await validateAdminLoginToken(req.cookies);

    console.log(results);
    if(results["IS_VALID"] == true) {
        let usersArr = await userRepository.find({
            select: ["id","email"],
        });
        let users = [];
        usersArr.forEach(function (u) {
            users.push({
                id: u.id,
                content_type: 'user',
                params: {
                    email: u.email,
                }
            })
        });
        results['users'] = users;
    }
    return res.json(results);
}

// Specific user controller (takes request, response from route call)
export const UserV = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);     
    const results = await validateAdminLoginToken(req.cookies);

    console.log(results);
    console.log(req.params.id);

    if(results["IS_VALID"] == true ) {
        console.log(req.params.id)
        let user = await userRepository.findOne({id: parseInt(req.params.id)});
        if (user == undefined)
            return res.json({"USER": null})
        return res.json(user);
    }
    return res.json(results);
}

// Orders controller (takes request, response from route call)
export const Orders = async (req: Request, res: Response) => {
    const orderRepository = getConnection().getRepository(Order);     
    const results = await validateAdminLoginToken(req.cookies);

    console.log(results);
    if(results["IS_VALID"] == true) {
        let orders = await orderRepository.find();        
        return res.json(orders);
    }
    return res.json(results);
}

// Specific order controller (takes request, response from route call)
export const OrderV = async (req: Request, res: Response) => {
    const orderRepository = getConnection().getRepository(Order);     
    const results = await validateAdminLoginToken(req.cookies);

    console.log(results);
    if(results["IS_VALID"] == true ) {
        let order = await orderRepository.findOne(req.params.id);
        if (order == undefined)
            return res.json({"ORDER": null})
        return res.json(order);
    }
    return res.json(results);
}

// Equipments controller (takes request, response from route call)
export const EquipmentList = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(Equipment);     
    const results = await validateAdminLoginToken(req.cookies);
    
    if(results["IS_VALID"] == true) {
        let equipmentArr = await equipmentRepository.find({
            select: ["id","model","equipment_type"]
        });
        let equipment = [];
        equipmentArr.forEach(function (e) {
            equipment.push({
                id: e.id,
                content_type: 'equipment',
                params: {
                    equipment_type: e.equipment_type,
                    model: e.model
                }
            })
        });
        results['equipment'] = equipment;
    }
    return res.json(results);
}

// Specific equipment controller (takes request, response from route call)
export const EquipmentDetails = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(Equipment);     
    const results = await validateAdminLoginToken(req.cookies);
    if(results["IS_VALID"] == true ) {
        let equipment = await equipmentRepository.findOne(req.params.id);
        if (equipment == undefined)
        return res.json({"EQUIPMENT": null})
        return res.json(equipment);
    }
    return res.json(results);
}

// Equipments controller (takes request, response from route call)
export const EquipmentAddView = async (req: Request, res: Response) => {
    const results = await validateAdminLoginToken(req.cookies);

    console.log(results);
    if(results["IS_VALID"] == true) {
        return res.json({
            "EQUIPMENT_TYPE": EquipmentType,
            "TYRE_TYPE": TyreType,
            "BRANDS": Brand
        });
    }
    return res.json(results);
}

// Specific equipment controller (takes request, response from route call)
export const EquipmentAddHandle = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(Equipment);     
    const results = await validateAdminLoginToken(req.cookies);

    console.log(results);
    if(results["IS_VALID"] == true ) {
        const equipmentErrors = validateEquipmentCreate(req.body);
        if(equipmentErrors["TOTAL_WARNINGS"] == 0) {
            let equipment = await equipmentRepository.create(req.body);
            await equipmentRepository.save(equipment);
            return res.send(equipment);
        }
        return res.json(equipmentErrors)
    }
    return res.json(results);
}