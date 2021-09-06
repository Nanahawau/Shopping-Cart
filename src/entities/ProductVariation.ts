import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne, OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Product} from "./Product";
import {IsInt, IsNotEmpty, IsString} from "class-validator";
import {Variant} from "./Variant";
import {CartItem} from "./CartItem";

@Entity({name: 'ProductVariation'})
export class ProductVariation {

    @PrimaryGeneratedColumn()
    id! : number

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @Column("bigint")
    @IsInt()
    stockLevel!: number;

    @Column("bigint")
    @IsInt()
    price!: number;

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    SKU!: string;

    @Column("date")
    expiry!: Date;

    @ManyToOne(() => Product, product => product.productVariations)
    product!: Product;

    @OneToOne(() => CartItem, cartItem => cartItem.productVariant)
    cartItem!: CartItem;

    @ManyToMany(() => Variant)
    @JoinTable()
    variants!: Variant[];


}