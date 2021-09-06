import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
// @ts-ignore
import {Audit} from './Audit';
import {Inventory} from "./Inventory";
import {Category} from "./Category";
import {Discount} from "./Discount";
import {ProductVariation} from "./ProductVariation";
import {IsIn, IsInt, IsNotEmpty, IsString} from "class-validator";
import {Brand} from "./Brand";


@Entity({name: 'Product'})
export class Product {

    @PrimaryGeneratedColumn()
    id! : number

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @Column("varchar", { length: 500 })
    @IsString()
    @IsNotEmpty()
    description!: string;

    @Column("bigint")
    @IsInt()
    actualPrice!: number;

    @OneToOne(() => Inventory, inventory => inventory.product)
    @JoinColumn()
    inventory!: Inventory;

    @OneToOne(() => Brand, brand => brand.product)
    @JoinColumn()
    brand!: Brand;

    @OneToOne(() => Category, category => category.product)
    @JoinColumn()
    category!: Category;

    @OneToOne(() => Discount, discount => discount.product)
    @JoinColumn()
    discount!: Discount;

    @OneToMany(() => ProductVariation, productVariation => productVariation.product)
    productVariations!: ProductVariation [];
}