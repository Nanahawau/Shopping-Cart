import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
import {IsInt} from "class-validator";

@Entity({name: 'Inventory'})
export class Inventory {

    @PrimaryGeneratedColumn()
    id! : number

    @Column("bigint")
    @IsInt()
    quantity!: number;

    @OneToOne(() => Product, product => product.inventory)
    product!: Product;
}