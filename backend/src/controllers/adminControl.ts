import {validateAdminLogin, validateAdminLoginToken} from "../validators/adminValidator";
import {generateHashedToken} from "../bin/loginToken";
import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {User, UserRole} from "../entity/User";
import {Order} from "../entity/Order";
import {Equipment, EquipmentType, TyreType, Brand} from "../entity/Equipment";
import { validateEquipment } from "../validators/equipmentEditCreateValidator";

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
export const UsersList = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);     
    const results = await validateAdminLoginToken(req.cookies);
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
export const UserDetails = async (req: Request, res: Response) => {
    const userRepository = getConnection().getRepository(User);     
    const results = await validateAdminLoginToken(req.cookies);

    if(results["IS_VALID"] == true ) {
        let user = await userRepository.findOne(req.params.id);
        let tmp = {}
        for(var key in user) 
            if(user[key] !== null)
                tmp[key] = user[key]
        results['user'] = tmp;
    }
    return res.json(results);
}

// Equipments controller (takes request, response from route call)
export const UserUpdate = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(User);     
    const results = await validateAdminLoginToken(req.cookies);
    if(results["IS_VALID"] == true) {
        const userErrors = await validateEquipment(req.body);
        if(userErrors.total_warnings == 0) {
            await equipmentRepository.update(req.params.id, req.body);
        }
        results['userErrors'] = userErrors;
    }
    return res.json(results);
}

// Orders controller (takes request, response from route call)
export const Orders = async (req: Request, res: Response) => {
    const orderRepository = getConnection().getRepository(Order);     
    const results = await validateAdminLoginToken(req.cookies);
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
        let tmp = {}
        for(var key in equipment) 
            if(equipment[key] !== null)
                tmp[key] = equipment[key]
        results['equipment'] = tmp;
    }
    return res.json(results);
}

// Equipments controller (takes request, response from route call)
export const EquipmentSideData = async (req: Request, res: Response) => {
    const results = await validateAdminLoginToken(req.cookies);
    if(results["IS_VALID"] == true) {
        let equipment = new Equipment();
        delete equipment.id;
        return res.json({
            "equipment_type": EquipmentType,
            "tyre_type": TyreType,
            "brand": Brand,
            'equipment_template': equipment
        });
    }
    return res.json(results);
}

// Equipments controller (takes request, response from route call)
export const EquipmentUpdate = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(Equipment);     
    const results = await validateAdminLoginToken(req.cookies);
    if(results["IS_VALID"] == true) {
        const equipmentErrors = await validateEquipment(req.body);
        if(equipmentErrors.total_warnings == 0) {
            await equipmentRepository.update(req.params.id, req.body);
        }
        results['equipmentErrors'] = equipmentErrors;
    }
    return res.json(results);
}

// Specific equipment controller (takes request, response from route call)
export const EquipmentAdd = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(Equipment);     
    const results = await validateAdminLoginToken(req.cookies);
    if(results["IS_VALID"] == true ) {
        const equipmentErrors = await validateEquipment(req.body);
        if(equipmentErrors.total_warnings == 0) {
            let equipment = await equipmentRepository.create(req.body);
            let info = await equipmentRepository.save(equipment);
        }
        results['equipmentErrors'] = equipmentErrors;
    }
    return res.json(results);
}

// Equipments controller (takes request, response from route call)
export const EquipmentDelete = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(Equipment);     
    const results = await validateAdminLoginToken(req.cookies);
    if(results["IS_VALID"] == true) {
        await equipmentRepository.delete(req.params.id);
    }
    return res.json(results);
}