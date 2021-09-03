import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Audit} from "./Audit";
import {Product} from "./Product";

@Entity({name: 'ProductMetadata'})
export class Metadata extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    brand!: string;

    @Column()
    additionalCategory!: string;

    @Column(() => Audit)
    audit!: Audit;

    @OneToOne(() => Product, product => product.metadata)
    product!: Product;

}