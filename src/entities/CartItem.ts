import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Audit} from "./Audit";
import {User} from "./User";
import {Cart} from "./Cart";

@Entity({name: 'CartItem'})
export class CartItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id! : number

    @Column("bigint")
    price! : bigint

    @Column("bigint")
    discount!: bigint

    @Column("bigint")
    quantity!: number;

    @Column(() => Audit)
    audit!: Audit;

    @ManyToOne(() => Cart, cart => cart.cartItems)
    cart!: Cart;
}