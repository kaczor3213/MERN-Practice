import "reflect-metadata";
import {createConnection} from "typeorm"
import * as salting from "./src/bin/salting"
import {User, UserRole} from "./src/entity/User"
import {Order} from "./src/entity/Order"
import {Equipment, EquipmentType, TyreType, Brand} from "./src/entity/Equipment"

createConnection().then(async connection => {

    connection.createQueryBuilder().insert().into(User).values([
        {
            firstName: "Andrzej",
            lastName: "Bąk",
            email: "andrzej.bak@janusze.pl",
            phoneNumber: "962021207",
            postCode: "32-663",
            place: "Rzepiennik Strzyżewski",
            address: "6 Buell Way",
            password: salting.getSaltedPassword("30m8CnBxyY"),
            orders: null,
        },
        {
            firstName: "Wojciech",
            lastName: "Czerwiec",
            email: "wojciech.czerwiec@roksa.pl",
            phoneNumber: "543860237",
            postCode: "23-363",
            place: "Jajar",
            address: "50302 Schiller Terrace",
            password: salting.getSaltedPassword("xhjmJG1TtLGO"),
            orders: null,
        },
        {
            firstName: "Tytus",
            lastName: "Bomba",
            email: "tytus.bomba@gwiezdnaflota.pl",
            phoneNumber: "493751241",
            postCode: "83-163",
            place: "Barayong",
            address: "8 Golf View Junction",
            password: salting.getSaltedPassword("E3qdsgfUaB"),
            orders: null,
        },
        {
            firstName: "Piotruś",
            lastName: "Lach",
            email: "piotr.lach@onet.pl",
            phoneNumber: "762056467",
            postCode: "32-663",
            place: "Rzepiennik Strzyżewski",
            address: "9 Dwight Crossing",
            password: salting.getSaltedPassword("R23nwE7tO"),
            orders: null,
        },
        {
            firstName: "Cezary",
            lastName: "Boczek",
            email: "cezary.boczek@janusze.pl",
            phoneNumber: "702203293",
            postCode: "13-563",
            place: "Kishorganj",
            address: "20989 Upham Terrace",
            password: salting.getSaltedPassword("zSiPWk2QdZv"),
            orders: null,
        },
        {
            firstName: "Mateusz",
            lastName: "Rudy",
            email: "mecze.jsa@kochamjave.com",
            phoneNumber: "953523704",
            postCode: "94-063",
            place: "Jembangan",
            address: "6582 Grover Center",
            password: salting.getSaltedPassword("cex213Aj9jB"),
            orders: null,
        },
        {
            firstName: "Spok",
            lastName: "Spoooook",
            email: "dobry.kolega@startrek.pl",
            phoneNumber: "115839482",
            postCode: "52-363",
            place: "Gimcheon",
            address: "09613 Village Green Road",
            password: salting.getSaltedPassword("ZQx3adsWFY"),
            orders: null,
        },
        {
            firstName: "Zenek",
            lastName: "Stonoga",
            email: "zenus@niezalezny.org",
            phoneNumber: "320361194",
            postCode: "15-963",
            place: "Bugko",
            address: "1190 Norway Maple Way",
            password: salting.getSaltedPassword("dBc12SL6eq"),
            orders: null,
        },
        {
            firstName: "Ojciec",
            lastName: "Rydz",
            email: "rudyrydz@parafia.cc",
            phoneNumber: "349712962",
            postCode: "72-263",
            place: "Uralo-Kavkaz",
            address: "4 Washington Plaza",
            password: salting.getSaltedPassword("uoYGdsa2NHeiSe9"),
            orders: null,
        },
        {
            firstName: "Przemek",
            lastName: "Rak",
            email: "smierdzacylen@wp.pl",
            phoneNumber: "192076577",
            postCode: "12-563",
            place: "San Onofre",
            address: "2839 Dahle Lane",
            password: salting.getSaltedPassword("Arl5DmpUP9"),
            orders: null,
            role: UserRole.ADMIN
        },
    ]).execute();

   connection.createQueryBuilder().insert().into(Equipment).values([
        {
            equipment_type:EquipmentType.TRACTOR,
            tyre_type: TyreType.R1,
            model: "Major 80",
            cost_per_day: 590.00,
            fuel_capacity: 83,
            horsepower: 75,
            mass: 3078,
            max_speed: 33,
            brand: Brand.ZETOR,
            orders: null,
        },
        {
            equipment_type: EquipmentType.TRACTOR,
            tyre_type: TyreType.R2,
            model: "700 Vario",
            cost_per_day: 1640.00,
            fuel_capacity: 400,
            horsepower: 165,
            mass: 8006,
            max_speed: 53,
            brand: Brand.FENDT,
            orders: null,
        },
        {
            equipment_type: EquipmentType.TRACTOR,
            tyre_type: TyreType.R3,
            model: "MF 7700",
            cost_per_day: 1720.00,
            fuel_capacity: 430,
            horsepower: 210,
            mass: 7540,
            max_speed: 53,
            brand: Brand.MASSEY_FERGUSON,
            orders: null,
        },
        {
            equipment_type: EquipmentType.HARVESTER,
            tyre_type: TyreType.R4,
            model: "TC5.90",
            working_width: 9,
            cost_per_day: 1760.00,
            crop_capacity: 6400,
            fuel_capacity: 400,
            horsepower: 258,
            mass: 11809,
            max_speed: 23,
            brand: Brand.NEW_HOLLAND,
            orders: null,
        },
        {
            equipment_type: EquipmentType.HARVESTER,
            tyre_type: TyreType.R4,
            model: "1660 Axial-Flow",
            working_width: 6,
            cost_per_day: 1450.00,
            crop_capacity: 6340,
            fuel_capacity: 350,
            horsepower: 190,
            mass: 9074,
            max_speed: 22,
            brand: Brand.CASE_IH,
            orders: null,
        },
        {
            equipment_type: EquipmentType.HARVESTER,
            tyre_type: TyreType.R4,
            model: "TORUM 760",
            working_width: 12,
            cost_per_day: 3420.00,
            crop_capacity: 12000,
            fuel_capacity: 850,
            horsepower: 490,
            mass: 16142,
            max_speed: 32,
            brand: Brand.ROSTSELMASH,
            orders: null,
        },
        {
            equipment_type: EquipmentType.CULTIVATOR,
            model: "TERRANO 4 FX",
            working_width: 4,
            cost_per_day: 360.00,
            power_required: 160,
            mass: 2740,
            brand: Brand.HORSCH,
            orders: null,
        },
        {
            equipment_type: EquipmentType.CULTIVATOR,
            model: "CARRIER XL 625",
            working_width: 6,
            cost_per_day: 520.00,
            power_required: 260,
            mass: 6600,
            brand: Brand.VADERSTAD,
            orders: null,
        },
        {
            equipment_type: EquipmentType.CULTIVATOR,
            model: "TIGER 10 LT",
            working_width: 10,
            cost_per_day: 1040.00,
            power_required: 400,
            mass: 10835,
            brand: Brand.HORSCH,
            orders: null,
        },
        {
            equipment_type: EquipmentType.SOWER,
            model: "GL 420",
            capacity: 2740,
            working_width: 3,
            cost_per_day: 50.00,
            power_required: 120,
            mass: 2300,
            brand: Brand.GRIMME,
            orders: null,
        },
        {
            equipment_type: EquipmentType.SOWER,
            model: "RAPID A 600S",
            capacity: 3100,
            working_width: 6,
            cost_per_day: 150.00,
            power_required: 180,
            mass: 6000,
            brand: Brand.VADERSTAD,
            orders: null,
        },
        {
            equipment_type: EquipmentType.SOWER,
            model: "MAESTRO 12 SW",
            capacity: 9000,
            working_width: 9,
            cost_per_day: 330.00,
            power_required: 180,
            mass: 7175,
            brand: Brand.HORSCH,
            orders: null,
        },
        {
            equipment_type: EquipmentType.TIPPER,
            model: "DB 8",
            capacity: 8000,
            tyre_type: TyreType.R3,
            cost_per_day: 188.00,
            mass: 3541,
            brand: Brand.METALTECH,
            orders: null,
        },
        {
            equipment_type: EquipmentType.TIPPER,
            model: "AGROLINER TKD 302",
            capacity: 21000,
            tyre_type: TyreType.R3,
            cost_per_day: 540.00,
            mass: 4498,
            brand: Brand.KROEGER,
            orders: null,
        },
        {
            equipment_type: EquipmentType.TIPPER,
            model: "ASS  298",
            capacity: 47000,
            tyre_type: TyreType.R3,
            cost_per_day: 1220.00,
            mass: 7526,
            brand: Brand.FLIEGL,
            orders: null,
        },
    ]).execute();

}).catch(error => console.log(error));