import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CartStatus} from "../enums/CartStatus";
import {DiscountType} from "../enums/DiscountType";
import {User} from "./User";
import {CartItem} from "./CartItem";
import {IsBoolean, IsNotEmpty, IsString} from "class-validator";

@Entity({name: 'Cart'})
export class Cart  {
    @PrimaryGeneratedColumn()
    id!: bigint

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    sessionId!: string;

    @Column("bigint")
    total!: bigint;

    @Column({
        type: "enum",
        enum: CartStatus,
        default: CartStatus.ACTIVE
    })
    @IsBoolean()
    status!: CartStatus;


    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    cartItems!: CartItem[];

    @ManyToOne(() => User, user => user.carts)
    user!: User;


}