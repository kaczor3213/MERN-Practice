import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne} from "typeorm";
import { Order } from './Order'

export enum EquipmentType {
    TRACTOR = "tractor",
    HARVESTER = "harvester",
    CULTIVATOR = "cultivator",
    SOWING_MACHINE = "sowing machine",
    TRAILER = "trailer",
}

export enum TyreType {
    R1 = "r1",
    R1W = "r1w",
    R2 = "r2",
    R3 = "r3",
    R4 = "r4",
}

@Entity()
export class Equipment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "set", enum: EquipmentType})
    equipment_type: string;

    @Column({type: "set", enum: TyreType})
    tyre_type: string;

    @Column("varchar", {length: 200})
    model: string;

    @Column()

    @ManyToMany(type => Order, order => order.equipments)
    orders: Order[];

}