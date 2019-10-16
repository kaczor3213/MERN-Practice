import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Length, IsEmail } from "class-validator";
import {Order} from "./Order";

export enum UserRole {
    ADMIN = "admin",
    CLIENT = "client",
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 50)
    firstName: string;

    @Column()
    @Length(1, 50)
    lastName: string;

    @Column({unique: true})
    @IsEmail()
    email: string;

    @Column("text")
    password: string;

    @Column({type: "set", enum: UserRole, default: UserRole.CLIENT})
    role: string;
    
    @OneToMany(type => Order, order => order.user)
    orders: Order[];

}
