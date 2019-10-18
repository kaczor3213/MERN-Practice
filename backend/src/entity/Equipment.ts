import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, TableInheritance} from "typeorm";
import { Order } from './Order'
import { IsInt, Min, Max } from "class-validator";

export enum EquipmentType {
    TRACTOR = "tractor",
    HARVESTER = "harvester",
    CULTIVATOR = "cultivator",
    SOWING_MACHINE = "sowing machine",
    TRAILER = "tipper",
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
    HORSCH = "HORSCH",
}

@Entity()
export class Equipment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "enum", enum: Brand})
    brand: string;

    @Column({type: "enum", enum: EquipmentType})
    equipment_type: string;

    @Column({type: "enum", enum: TyreType})
    tyre_type: string;

    @Column({type: "varchar", length: 200})
    model: string;

    @Column({nullable: true, default: null})
    @IsInt()
    @Min(0)
    @Max(9999)
    horsepower: number 

    @Column({nullable: true})
    @IsInt()
    @Min(0)
    @Max(99)
    max_speed: number
    
    @Column({nullable: true})
    @IsInt()
    @Min(0)
    @Max(99999)
    mass: number

    @Column()
    @IsInt()
    @Min(0)
    @Max(9999)
    cost_per_day: number

    @Column({nullable: true})
    @IsInt()
    @Min(0)
    @Max(9999)
    fuel_capacity: number

    @Column({nullable: true})
    @IsInt()
    @Min(0)
    @Max(99999)
    crop_capacity: number

    @Column({nullable: true})
    @IsInt()
    @Min(0)
    @Max(99999)
    capacity: number

    @Column({nullable: true})
    @IsInt()
    @Min(0)
    @Max(99)
    working_width: number

    @Column({nullable: true})
    @IsInt()
    @Min(0)
    @Max(9999)
    power_required: number

    @ManyToMany(type => Order, order => order.equipments)
    orders: Order[];

}