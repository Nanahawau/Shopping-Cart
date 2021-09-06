import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Cart} from "./Cart";
import {Discount} from "./Discount";
import {Product} from "./Product";
import {ProductVariation} from "./ProductVariation";

@Entity({name: 'CartItem'})
export class CartItem {

    @PrimaryGeneratedColumn()
    id! : number

    // @Column("bigint")
    // price! : number
    //
    // @Column("bigint")
    // discount!: number

    @Column("bigint")
    quantity!: number;


    @OneToOne(() => ProductVariation, productVariant => productVariant.cartItem)
    @JoinColumn()
    productVariant!: ProductVariation;

    @ManyToOne(() => Cart, cart => cart.cartItems)
    cart!: Cart;
}