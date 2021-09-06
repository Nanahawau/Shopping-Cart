import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Cart} from "./Cart";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";


@Entity({name : 'User'})
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", {unique: true,length: 200})
    @IsEmail()
    email!: string;

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    password!: string;

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    salt!: string;


    @OneToMany(() => Cart, cart => cart.user)
    carts!: Cart[];


}