import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";
import { User } from "./User";
import { IsDate, IsInt, Min } from "class-validator";
import { Equipment } from "./Equipment";

export enum OrderStatus {
    R1 = "r1",
    R1W = "r1w",
    R2 = "r2",
    R3 = "r3",
    R4 = "r4",
}

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsDate()
    rent_from: string;

    @Column()
    @IsDate()        
    rent_to: string;

    @Column()
    @IsInt()
    @Min(0)
    totalcost: number;

    @Column({type: "enum", enum: OrderStatus})
    status: string;

    @ManyToMany(type => Equipment, equipment => equipment.orders)
    equipments: Equipment[];

    @ManyToOne(type => User, user => user.orders)
    user: User;
}