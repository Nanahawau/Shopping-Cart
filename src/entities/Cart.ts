import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Audit} from "./Audit";
import {CartStatus} from "../enums/CartStatus";
import {DiscountType} from "../enums/DiscountType";
import {User} from "./User";
import {CartItem} from "./CartItem";

@Entity({name: 'Cart'})
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: bigint

    @Column()
    sessionId!: string;

    @Column()
    total!: bigint;

    @Column({
        type: "enum",
        enum: CartStatus,
        default: CartStatus.ACTIVE
    })
    status!: CartStatus;

    @Column(() => Audit)
    audit!: Audit;

    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    cartItems!: CartItem[];

    @ManyToOne(() => User, user => user.carts)
    user!: User;


}