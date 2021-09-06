import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {DiscountType} from "../enums/DiscountType";
import {Product} from "./Product";
import {IsBoolean, IsInt, IsNotEmpty, IsString} from "class-validator";

@Entity({name: 'Discount'})
export class Discount{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    name!: string

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    description!: string

    @Column("bool")
    @IsBoolean()
    active!: boolean

    @Column({
        type: "enum",
        enum: DiscountType,
        default: DiscountType.PERCENT
    })
    type!: DiscountType

    @Column("bigint")
    @IsInt()
    value!: number

    @OneToOne(() => Product, product => product.discount)
    product!: Product;
}