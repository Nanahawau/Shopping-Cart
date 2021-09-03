import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
// @ts-ignore
import {Audit} from './Audit';
import {Inventory} from "./Inventory";
import {JoinColumn} from "typeorm/browser";
import {Category} from "./Category";
import {Discount} from "./Discount";
import {Metadata} from "./Metadata";

@Entity({name: 'Product'})
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn()
    id! : number

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    SKU!: number;

    @Column()
    price!: number;

    @Column()
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