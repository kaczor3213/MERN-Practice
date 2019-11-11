import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique} from "typeorm";
import {Length, IsEmail, IsPhoneNumber} from "class-validator";
import {Order} from "./Order";

export enum UserRole {
    ADMIN = "admin",
    CLIENT = "client",
}

@Entity()
@Unique(["email", "phoneNumber"])
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

    @Column({unique: true})
    @IsPhoneNumber("PL")
    phoneNumber: string;

    @Column()
    address: string;

    @Column()
    place: string;

    @Column()
    postCode: string;

    @Column("text")
    password: string;

    @Column("text", {nullable: true, default: null})
    access_token: string;

    @Column({type: "enum", enum: UserRole, default: UserRole.CLIENT})
    role: string;
    
    @OneToMany(type => Order, order => order.user)
    orders: Order[];
}