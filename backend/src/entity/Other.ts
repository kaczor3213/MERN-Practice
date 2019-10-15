import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Other {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}