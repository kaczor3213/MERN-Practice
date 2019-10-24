import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";
import { User } from "./User";
import { IsDate, IsInt, Min } from "class-validator";
import { Equipment } from "./Equipment";

export enum OrderStatus {
    WAITING_FOR_PAYMENT = "W",
    REALIZED = "R",
    OUTDATED = "_"
}

export enum PaymentType {
    CASH = "C",
    TRANSFER = "T",
    DEBIT_CARD = "D"
}

export enum CardType {
    VISA = "V",
    MASTERCARD = "M"
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
    @Min(0)
    totalcost: number;

    @Column({type: "enum", enum: PaymentType})
    payment: string;

    @Column({type: "enum", enum: OrderStatus})
    status: string;

    @ManyToMany(type => Equipment, equipment => equipment.orders)
    equipments: Equipment[];

    @ManyToOne(type => User, user => user.orders)
    user: User;
}