import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Audit} from "./Audit";
import {Product} from "./Product";

@Entity({name: 'ProductCategory'})
export class Category extends BaseEntity{

    @PrimaryGeneratedColumn()
    id! : bigint

    @Column("varchar", { length: 200 })
    name!: string;

    @Column("varchar", { length: 200 })
    description!: string;

    @Column(() => Audit)
    audit!: Audit;

    @OneToOne(() => Product, product => product.category)
    product!: Product;
}