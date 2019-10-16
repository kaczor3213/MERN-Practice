import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";
import { User } from "./User";
import { IsDate } from "class-validator";
import { Equipment } from "./Equipment";

var 

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

    @ManyToMany(type => Equipment, equipment => equipment.orders)
    equipments: Equipment[];

    @ManyToOne(type => User, user => user.orders)
    user: User;
}