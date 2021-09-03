import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
// @ts-ignore
import {Audit} from './Audit';
import {Inventory} from "./Inventory";
import {Category} from "./Category";
import {Discount} from "./Discount";
import {Metadata} from "./Metadata";

@Entity({name: 'Product'})
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn()
    id! : number

    @Column("varchar", { length: 200 })
    name!: string;

    @Column("varchar", { length: 500 })
    description!: string;

    @Column("bigint")
    SKU!: number;

    @Column("bigint")
    price!: bigint;

    @Column("bigint")
    quantity!: number;

    @Column(() => Audit)
    audit!: Audit;

    @OneToOne(() => Inventory, inventory => inventory.product)
    @JoinColumn()
    inventory!: Inventory;

    @OneToOne(() => Category, category => category.product)
    @JoinColumn()
    category!: Category;

    @OneToOne(() => Discount, discount => discount.product)
    @JoinColumn()
    discount!: Discount;

    @OneToOne(() => Metadata, metadata => metadata.product)
    @JoinColumn()
    metadata!: Metadata;
}