import {EquipmentType, TyreType, Brand, Status} from "../entity/Equipment";
import {Dictionary} from "express-serve-static-core";
import {getConnection} from "typeorm";

var EQUIPMENT_ERROR_CODE  = {
    "TOTAL_WARNINGS": 0,
    "BRAND_ERROR": false,
    "EQUIPMENT_TYPE_ERROR": false,
    "TYRE_TYPE_ERROR": false,
    "MODEL_ERROR": false,
    "HORSEPOWER_ERROR": false,
    "MAX_SPEED_ERROR": false,
    "MASS_ERROR": false,
    "COST_PER_DAY_ERROR": false,
    "FUEL_CAPACITY_ERROR": false,
    "CROP_CAPACITY_ERROR": false,
    "CAPACITY_ERROR": false,
    "WORKING_WIDTH_ERROR": false,
    "POWER_REQUIRED_ERROR": false,
}

export const validateEquipmentCreate = async (params: Dictionary<string>) => {
    try {
        if(!(params.brand in Brand))
            throw new TypeError("There is no such brand!");
    } catch(e) {
        console.log(e);
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.BRAND_ERROR=true;
    }
    
    try {
        if(params.model === undefined)
            throw new TypeError("Model name was not defined for user!");
        if(params.model.length == 0)
            throw new TypeError("Model name cannot be an empty string!");
    } catch(e) {
        console.log(e);
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.MODEL_ERROR=true;
    }

    try {
        if(params.mass === undefined)
            throw new TypeError("Equipment mass was not defined for user!");
        if(params.mass.length == 0)
            throw new TypeError("Equipment mass cannot be an empty string!");
            if(parseFloat(params.model) <= 0)
            throw new TypeError("Equipment cannot be weightless!");
    } catch(e) {
        console.log(e);
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.MASS_ERROR=true;
    }

    try {
        switch(params.equipment_type) {
            case EquipmentType.TRACTOR:
                validateTractorCreate(params);

            case EquipmentType.HARVESTER:
                validateHarvesterCreate(params);

            case EquipmentType.CULTIVATOR:
                validateCultivatorCreate(params);

            case EquipmentType.SOWING_MACHINE:
                validateSowingMachineCreate(params);

            case EquipmentType.TIPPER:
                validateTipperCreate(params);

            default:
                throw new TypeError("No proper equipment type was declared!")
        }
    } catch(e) {
        console.log(e);
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.EQUIPMENT_TYPE_ERROR=true;
    }
}


export function validateTractorCreate(params: Dictionary<string>): boolean {
    if(!(params.tyre_type in TyreType)) {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.TYRE_TYPE_ERROR=true;
        return false;
    }
    if(parseInt(params.fuel_capacity) < 0 || params.fuel_capacity === undefined || params.fuel_capacity == "") {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.FUEL_CAPACITY_ERROR=true;
        return false;
    }
    if(parseInt(params.horsepower) < 0 || params.horsepower === undefined || params.horsepower == "") {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.HORSEPOWER_ERROR=true;
        return false;
    } 
    if(parseInt(params.max_speed) < 0 || params.max_speed === undefined || params.max_speed == "") {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.MAX_SPEED_ERROR=true;
        return false;
    }
    EQUIPMENT_ERROR_CODE.POWER_REQUIRED_ERROR = null;
    EQUIPMENT_ERROR_CODE.CROP_CAPACITY_ERROR = null;
    EQUIPMENT_ERROR_CODE.WORKING_WIDTH_ERROR = null;
    EQUIPMENT_ERROR_CODE.CAPACITY_ERROR = null;

    return true;
}


export function validateHarvesterCreate(params: Dictionary<string>): boolean {
    if(!(params.tyre_type in TyreType)) {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.TYRE_TYPE_ERROR=true;
        return false;
    }
    if(parseInt(params.working_width) < 0 || params.working_width === undefined || params.working_width == "") {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.FUEL_CAPACITY_ERROR=true;    
        return false;
    }
    if(parseInt(params.fuel_capacity) < 0 || params.fuel_capacity === undefined || params.fuel_capacity == "") {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.FUEL_CAPACITY_ERROR=true;
        return false;
    }
    if(parseInt(params.horsepower) < 0 || params.horsepower === undefined || params.horsepower == "") {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.HORSEPOWER_ERROR=true;
        return false;
    } 
    if(parseInt(params.max_speed) < 0 || params.max_speed === undefined || params.max_speed == "") {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.MAX_SPEED_ERROR=true;
        return false;
    }
    if(parseInt(params.crop_cpacity) < 0 || params.crop_cpacity === undefined || params.crop_cpacity == "") {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.CROP_CAPACITY_ERROR=true;
        return false;
    }
    EQUIPMENT_ERROR_CODE.POWER_REQUIRED_ERROR = null;
    EQUIPMENT_ERROR_CODE.CAPACITY_ERROR= null;

    return true;    
}


export function validateCultivatorCreate(params: Dictionary<string>): boolean {
    if(parseInt(params.working_width) < 0 || params.working_width === undefined || params.working_width == "") {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.FUEL_CAPACITY_ERROR=true;    
        return false;
    }
    if(parseInt(params.power_required) < 0 || params.power_required === undefined || params.power_required == "") {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.POWER_REQUIRED_ERROR=true;     
        return false;
    }
    EQUIPMENT_ERROR_CODE.FUEL_CAPACITY_ERROR = null;
    EQUIPMENT_ERROR_CODE.CROP_CAPACITY_ERROR = null;
    EQUIPMENT_ERROR_CODE.HORSEPOWER_ERROR = null;
    EQUIPMENT_ERROR_CODE.MAX_SPEED_ERROR = null;
    EQUIPMENT_ERROR_CODE.TYRE_TYPE_ERROR = null;
    EQUIPMENT_ERROR_CODE.CAPACITY_ERROR = null;

    return true;
}

export function validateSowingMachineCreate(params: Dictionary<string>): boolean {
    if(parseInt(params.working_width) < 0 || params.working_width === undefined || params.working_width == "") {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.FUEL_CAPACITY_ERROR=true;    
        return false;
    }
    if(parseInt(params.capacity) < 0 || params.capacity === undefined || params.capacity == "") {     
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.CAPACITY_ERROR=true;
        return false;
    }
    if(parseInt(params.power_required) < 0 || params.power_required === undefined || params.power_required == "") {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.POWER_REQUIRED_ERROR=true;     
        return false;
    }
    EQUIPMENT_ERROR_CODE.FUEL_CAPACITY_ERROR = null;
    EQUIPMENT_ERROR_CODE.CROP_CAPACITY_ERROR = null;
    EQUIPMENT_ERROR_CODE.HORSEPOWER_ERROR = null;
    EQUIPMENT_ERROR_CODE.MAX_SPEED_ERROR = null;
    EQUIPMENT_ERROR_CODE.TYRE_TYPE_ERROR = null;

    return true;
}

export function validateTipperCreate(params: Dictionary<string>): boolean {
    if(!(params.tyre_type in TyreType)) {
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.TYRE_TYPE_ERROR=true;
        return false;
    }
    if(parseInt(params.capacity) < 0 || params.capacity === undefined || params.capacity == "") {     
        EQUIPMENT_ERROR_CODE.TOTAL_WARNINGS++;
        EQUIPMENT_ERROR_CODE.CAPACITY_ERROR=true;
        return false;
    }
    EQUIPMENT_ERROR_CODE.POWER_REQUIRED_ERROR = null;
    EQUIPMENT_ERROR_CODE.WORKING_WIDTH_ERROR = null;
    EQUIPMENT_ERROR_CODE.FUEL_CAPACITY_ERROR = null;
    EQUIPMENT_ERROR_CODE.CROP_CAPACITY_ERROR = null;
    EQUIPMENT_ERROR_CODE.HORSEPOWER_ERROR = null;
    EQUIPMENT_ERROR_CODE.MAX_SPEED_ERROR = null;

    return true;
}