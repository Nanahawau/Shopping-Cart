import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Cart} from "./Cart";
import {ProductVariation} from "./ProductVariation";

@Entity({name: 'CartItem'})
export class CartItem {

    @PrimaryGeneratedColumn()
    id! : number


    @Column("bigint")
    quantity!: number;


    @OneToOne(() => ProductVariation, productVariant => productVariant.cartItem)
    @JoinColumn()
    productVariant!: ProductVariation;

    @ManyToOne(() => Cart, cart => cart.cartItems, {
        onDelete: "CASCADE"
    })
    cart!: Cart;
}