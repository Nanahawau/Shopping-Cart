import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Audit} from "./Audit";
import {DiscountType} from "../enums/DiscountType";
import {Product} from "./Product";

@Entity({name: 'ProductDiscount'})
export class Discount extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    active!: boolean

    @Column({
        type: "enum",
        enum: DiscountType,
        default: DiscountType.PERCENT
    })
    type!: DiscountType

    @Column()
    value!: bigint


    @Column(() => Audit)
    audit!: Audit;

    @OneToOne(() => Product, product => product.discount)
    product!: Product;
}