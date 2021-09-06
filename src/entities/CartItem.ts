import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Cart} from "./Cart";

@Entity({name: 'CartItem'})
export class CartItem {

    @PrimaryGeneratedColumn()
    id! : number

    @Column("bigint")
    price! : number

    @Column("bigint")
    discount!: number

    @Column("bigint")
    quantity!: number;

    @ManyToOne(() => Cart, cart => cart.cartItems)
    cart!: Cart;
}