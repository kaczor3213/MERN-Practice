import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, TableInheritance} from "typeorm";
import { Order } from './Order'
import { IsInt, Min, Max } from "class-validator";

export enum EquipmentType {
    TRACTOR = "TRACTOR",
    HARVESTER = "HARVESTER",
    CULTIVATOR = "CULTIVATOR",
    SOWING_MACHINE = "SOWING_MACHINE",
    TIPPER = "TIPPER",
}

export enum TyreType {
    R1 = "r1",
    R1W = "r1w",
    R2 = "r2",
    R3 = "r3",
    R4 = "r4",
}

export enum Brand {
    NEW_HOLLAND = "NEW_HOLLAND",
    VALTRA = "VALTRA",
    DEUTZ = "DEUTZ",
    MASSEY_FERGUSON = "MASSEY_FERGUSON",
    CASE_IH = "CASE_IH",
    STEYR = "STEYR",
    FENDT = "FENDT",
    ROSTSELMASH = "ROSTSELMASH",
    KROEGER = "KROEGER",
    METALTECH = "METALTECH",
    FLIEGL = "FLIEGL",
    VADERSTAD = "VADERSTAD",
    GRIMME = "GRIMME",
    ZETOR = "ZETOR",
    HORSCH = "HORSCH",
}

export enum Status {
    RENTED = "X",
    FREE = "O"
}

@Entity()
export class Equipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "enum", enum: Brand})
    brand: string;

    @Column({type: "enum", enum: EquipmentType})
    equipment_type: string;

    @Column({type: "enum", enum: TyreType, nullable: true})
    tyre_type: string;

    @Column({type: "varchar", length: 200})
    model: string;

    @Column({nullable: true, default: null})
    @IsInt()
    @Min(0)
    @Max(9999)
    horsepower: number 

    @Column({nullable: true, default: null})
    image: string;

    @Column({nullable: true, default: null})
    @IsInt()
    @Min(0)
    @Max(99)
    max_speed: number
    
    @Column({nullable: true, default: null})
    @IsInt()
    @Min(0)
    @Max(99999)
    mass: number

    @Column()
    @IsInt()
    @Min(0)
    @Max(9999)
    cost_per_day: number

    @Column({nullable: true, default: null})
    @IsInt()
    @Min(0)
    @Max(9999)
    fuel_capacity: number

    @Column({nullable: true, default: null})
    @IsInt()
    @Min(0)
    @Max(99999)
    crop_capacity: number

    @Column({nullable: true, default: null})
    @IsInt()
    @Min(0)
    @Max(99999)
    capacity: number

    @Column({nullable: true, default: null})
    @Min(0)
    @Max(99)
    working_width: number

    @Column({nullable: true, default: null})
    @IsInt()
    @Min(0)
    @Max(9999)
    power_required: number

    @ManyToMany(type => Order, order => order.equipments)
    orders: Order[];

}

// export const createEquipment = async (params: Dictionary<string>) => {
//     try {

//         let equipment = new Equipment();
//         equipment.brand = params.brand;
//         equipment.model = params.model;
//         equipment.image = params.image
//         equipment.tyre_type = params.tyre_type;
//         equipment.equipment_type = params.equipment_type

//         equipment.mass = Number(params.mass);
//         equipment.max_speed = Number(params.max_speed);
//         equipment.capacity = Number(params.capacity)
//         equipment.crop_capacity = Number(params.crop_capacity)
//         equipment.cost_per_day = Number(params.cost_per_day)
//         equipment.fuel_capacity = Number(params.fuel_capacity)
//         equipment.horsepower = Number(params.horsepower)
//         equipment.working_width = Number(params.working_width)
//         equipment.power_required = Number(params.power_required) 
//     }
// };