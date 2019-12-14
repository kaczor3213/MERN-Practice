import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, TableInheritance} from "typeorm";
import { Order } from './Order'
import { IsInt, Min, Max } from "class-validator";

export const EquipmentType = {
    TRACTOR: "traktor",
    HARVESTER: "kombajn",
    CULTIVATOR: "kultywator",
    SOWER: "siewnik",
    TIPPER: "naczepa",
}

export const TyreType = {
    R1: "r1",
    R1w: "r1w",
    R2: "r2",
    R3: "r3",
    R4: "r4",
}

export const Brand = {
    NEW_HOLLAND: "new holland",
    VALTRA: "valtra",
    DEUTZ: "deutz",
    MASSEY_FERGUSON: "massey fergusson",
    CASE_IH: "case ih",
    STEYR: "steyr",
    FENDT: "fendt",
    ROSTSELMASH: "rostselmash",
    KROEGER: "kroeger",
    METALTECH: "metaltech",
    FLIEGL: "fliegl",
    VADERSTAD: "vaderstad",
    GRIMME: "grimme",
    ZETOR: "zetor",
    HORSCH: "horsch",
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