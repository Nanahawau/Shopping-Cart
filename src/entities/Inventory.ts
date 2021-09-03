import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Audit} from "./Audit";
import {Product} from "./Product";

@Entity({name: 'ProductInventory'})
export class Inventory extends BaseEntity{

    @PrimaryGeneratedColumn()
    id! : number

    @Column("bigint")
    quantity!: number;

    @Column(() => Audit)
    audit!: Audit;

    @OneToOne(() => Product, product => product.inventory)
    product!: Product;
}