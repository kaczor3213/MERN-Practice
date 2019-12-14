import {EquipmentType, TyreType, Brand} from "../entity/Equipment";
import {Dictionary} from "express-serve-static-core";

var EQUIPMENT_ERROR_CODE = {
    total_warnings: 0,
    equipment_type: false,
    brand: false,
    model: false,
    capacity: false,
    crop_capacity: false,
    fuel_capacity: false,
    working_width: false,
    horsepower: false,
    power_required: false,
    mass: false,
    max_speed: false,
    tyre_type: false,
    cost_per_day: false
  }

export const validateEquipment = async (params: Dictionary<string>) => {
    let errors = '';
    EQUIPMENT_ERROR_CODE.total_warnings=0;
    try {
        if(!(Object.values(Brand).includes(params.brand) ))
            throw new TypeError("There is no such brand!");
    } catch(e) {
        errors += e+'\n';
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.brand=true;
    }
    
    try {
        if(params.model === undefined)
            throw new TypeError("Model name was not defined for user!");
        if(params.model.length == 0)
            throw new TypeError("Model name cannot be an empty string!");
    } catch(e) {
        errors += e+'\n';
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.model=true;
    }

    try {
        if(params.mass === undefined)
            throw new TypeError("Equipment mass was not defined for user!");
        if(params.mass.length == 0)
            throw new TypeError("Equipment mass cannot be an empty string!");
            if(parseFloat(params.model) <= 0)
            throw new TypeError("Equipment cannot be weightless!");
    } catch(e) {
        errors += e+'\n';
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.mass=true;
    }

    try {
        switch(params.equipment_type) {
            case EquipmentType.TRACTOR: {
                validateTractorCreate(params);
                break;
            }

            case EquipmentType.HARVESTER: {
                validateHarvesterCreate(params);
                break;
            }

            case EquipmentType.CULTIVATOR: {
                validateCultivatorCreate(params);
                break;
            }

            case EquipmentType.SOWER: {
                validateSowingMachineCreate(params);
                break;
            }

            case EquipmentType.TIPPER: {
                validateTipperCreate(params);
                break;
            }

            default:
                throw new TypeError("No proper equipment type was declared!")
        }
    } catch(e) {
        errors += e+'\n';
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.equipment_type=true;
    }

    console.log(errors)
    return EQUIPMENT_ERROR_CODE;
}


export function validateTractorCreate(params: Dictionary<string>): boolean {
        
    if(!(Object.values(TyreType).includes(params.tyre_type) )) {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.tyre_type=true;
        return false;
    }
    if(parseInt(params.fuel_capacity) < 0 || params.fuel_capacity === undefined || params.fuel_capacity == "") {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.fuel_capacity=true;
        return false;
    }
    if(parseInt(params.horsepower) < 0 || params.horsepower === undefined || params.horsepower == "") {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.horsepower=true;
        return false;
    } 
    if(parseInt(params.max_speed) < 0 || params.max_speed === undefined || params.max_speed == "") {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.max_speed=true;
        return false;
    }
    EQUIPMENT_ERROR_CODE.power_required = null;
    EQUIPMENT_ERROR_CODE.crop_capacity = null;
    EQUIPMENT_ERROR_CODE.working_width = null;
    EQUIPMENT_ERROR_CODE.capacity = null;

    return true;
}


export function validateHarvesterCreate(params: Dictionary<string>): boolean {
        
    if(!(Object.values(TyreType).includes(params.tyre_type) )) {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.tyre_type=true;
        return false;
    }
    if(parseInt(params.working_width) < 0 || params.working_width === undefined || params.working_width == "") {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.fuel_capacity=true;    
        return false;
    }
    if(parseInt(params.fuel_capacity) < 0 || params.fuel_capacity === undefined || params.fuel_capacity == "") {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.fuel_capacity=true;
        return false;
    }
    if(parseInt(params.horsepower) < 0 || params.horsepower === undefined || params.horsepower == "") {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.horsepower=true;
        return false;
    } 
    if(parseInt(params.max_speed) < 0 || params.max_speed === undefined || params.max_speed == "") {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.max_speed=true;
        return false;
    }
    if(parseInt(params.crop_cpacity) < 0 || params.crop_cpacity === undefined || params.crop_cpacity == "") {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.crop_capacity=true;
        return false;
    }
    EQUIPMENT_ERROR_CODE.power_required = null;
    EQUIPMENT_ERROR_CODE.capacity= null;

    return true;    
}


export function validateCultivatorCreate(params: Dictionary<string>): boolean {
    if(parseInt(params.working_width) < 0 || params.working_width === undefined || params.working_width == "") {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.fuel_capacity=true;    
        return false;
    }
    if(parseInt(params.power_required) < 0 || params.power_required === undefined || params.power_required == "") {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.power_required=true;     
        return false;
    }
    EQUIPMENT_ERROR_CODE.fuel_capacity = null;
    EQUIPMENT_ERROR_CODE.crop_capacity = null;
    EQUIPMENT_ERROR_CODE.horsepower = null;
    EQUIPMENT_ERROR_CODE.max_speed = null;
    EQUIPMENT_ERROR_CODE.tyre_type = null;
    EQUIPMENT_ERROR_CODE.capacity = null;

    return true;
}

export function validateSowingMachineCreate(params: Dictionary<string>): boolean {
    if(parseInt(params.working_width) < 0 || params.working_width === undefined || params.working_width == "") {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.fuel_capacity=true;    
        return false;
    }
    if(parseInt(params.capacity) < 0 || params.capacity === undefined || params.capacity == "") {     
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.capacity=true;
        return false;
    }
    if(parseInt(params.power_required) < 0 || params.power_required === undefined || params.power_required == "") {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.power_required=true;     
        return false;
    }
    EQUIPMENT_ERROR_CODE.fuel_capacity = null;
    EQUIPMENT_ERROR_CODE.crop_capacity = null;
    EQUIPMENT_ERROR_CODE.horsepower = null;
    EQUIPMENT_ERROR_CODE.max_speed = null;
    EQUIPMENT_ERROR_CODE.tyre_type = null;

    return true;
}

export function validateTipperCreate(params: Dictionary<string>): boolean {
    if(!(Object.values(TyreType).includes(params.tyre_type) )) {
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.tyre_type=true;
        return false;
    }
    if(parseInt(params.capacity) < 0 || params.capacity === undefined || params.capacity == "") {     
        EQUIPMENT_ERROR_CODE.total_warnings++;
        EQUIPMENT_ERROR_CODE.capacity=true;
        return false;
    }
    EQUIPMENT_ERROR_CODE.power_required = null;
    EQUIPMENT_ERROR_CODE.working_width = null;
    EQUIPMENT_ERROR_CODE.fuel_capacity = null;
    EQUIPMENT_ERROR_CODE.crop_capacity = null;
    EQUIPMENT_ERROR_CODE.horsepower = null;
    EQUIPMENT_ERROR_CODE.max_speed = null;

    return true;
}