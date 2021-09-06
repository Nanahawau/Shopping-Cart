import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Cart} from "./Cart";
import {Discount} from "./Discount";
import {Product} from "./Product";

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


    @OneToOne(() => Product, product => product.cartItem)
    @JoinColumn()
    product!: Product;

    @ManyToOne(() => Cart, cart => cart.cartItems)
    cart!: Cart;
}