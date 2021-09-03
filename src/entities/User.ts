import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Audit} from "./Audit";
import {Cart} from "./Cart";


@Entity({name : 'User'})
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    email!: string;

    @Column("varchar", { length: 200 })
    password!: string;

    @Column("varchar", { length: 200 })
    salt!: string;

    @Column(() => Audit)
    audit!: Audit


    @OneToMany(() => Cart, cart => cart.user)
    carts!: Cart[];


}