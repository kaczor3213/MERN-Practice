import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {Equipment, EquipmentType, Brand} from "../entity/Equipment";
import { parse } from "querystring";


// Equipments controller (takes request, response from route call)
export const Root = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(Equipment);     
    let equipments = await equipmentRepository.find();
    let tmp = [];
    for(var i=0; i<6; i++)
        tmp.push(equipments.splice(Math.floor(Math.random() * (equipments.length)),1)[0]);
    
    return res.json(tmp);
}

// Equipments controller (takes request, response from route call)
export const Search = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(Equipment);     
    let equipments = new Array<Equipment>();
    return res.json(equipments);
}

// Equipments controller (takes request, response from route call)
export const Equipments = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(Equipment);     
    let equipments = await equipmentRepository.find();        
    return res.json(equipments);
}

// Equipments controller (takes request, response from route call)
export const Brands = async (req: Request, res: Response) => {
    let tmp = [];
    for(var key in Brand)
        tmp.push(Brand[key]);
    return res.json(tmp);
}

// Equipments controller (takes request, response from route call)
export const EquipmentOfSpecificBrand = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(Equipment);     
    let equipments = equipmentRepository.find({brand: req.params.brand});
    return res.json(equipments);
}

// Equipments controller (takes request, response from route call)
export const EquipmentTypes = async (req: Request, res: Response) => {
    return res.json(EquipmentType);
}

// Specific equipment controller (takes request, response from route call)
export const EquipmentOfSpecificType = async (req: Request, res: Response) => {
    const equipmentRepository = getConnection().getRepository(Equipment);
    let equipments = equipmentRepository.find({equipment_type: req.params.equipment_type});
    return res.json(equipments);     
}