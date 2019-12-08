import {validateAdminLogin, validateAdminLoginToken} from "../validators/adminValidator";
import {generateHashedToken} from "../bin/adminLoginToken";
import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {User, UserRole} from "../entity/User";
import {Order} from "../entity/Order";
import {Equipment, EquipmentType, TyreType, Brand} from "../entity/Equipment";
import { validateEquipmentCreate } from "../validators/equipmentValidator";
export const LOGIN_TIMEOUT = 1800;

// Login controller (takes request, response from route call)
export const Login = async (req: Request, res: Response) => {
    const results = await validateAdminLogin(req.body);
    console.log(results);
    if(results["TOTAL_WARNINGS"] == 0) {
        let hashedToken = generateHashedToken(results["EMAIL"], req.headers["user-agent"]);
        res.cookie("adminLoginToken", hashedToken, { expires: new Date(Date.now() + LOGIN_TIMEOUT), httpOnly: true});
        return res.json(results);
    }
    return res.json(results);
}

// Logout controller (takes request, response from route call)
export const Logout = async (req: Request, res: Response) => {
    console.log(req.cookies)
    const results = await validateAdminLoginToken(req.cookies);
    console.log(results);
    if(results["IS_VALID"] == true) {
        res.cookie("shouldBeLogout", true);
        return res.json(results);
    }
    return res.json(results);
}

// Profile controller (takes request, response from route call)
export const Panel = async (req: Request, res: Response) => {
    const results = await validateAdminLoginToken(req.cookies);
    console.log(results);
    return res.json(results);
}

// Users controller (takes request, response from route call)
export const Users = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);     
    const results = await validateAdminLoginToken(req.cookies);

    console.log(results);
    if(results["IS_VALID"] == true) {
        let users = await userRepository.find({role: UserRole.CLIENT})     
        return res.json(users);
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
export const Equipments = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(Equipment);     
    const results = await validateAdminLoginToken(req.cookies);

    console.log(results);
    if(results["IS_VALID"] == true) {
        let equipments = await equipmentRepository.find();        
        return res.json(equipments);
    }
    return res.json(results);
}

// Specific equipment controller (takes request, response from route call)
export const EquipmentV = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(Equipment);     
    const results = await validateAdminLoginToken(req.cookies);

    console.log(results);
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