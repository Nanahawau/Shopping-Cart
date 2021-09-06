import {
    Column,
    Entity,
  JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Product} from "./Product";
import {IsInt, IsNotEmpty, IsString} from "class-validator";
import {Variant} from "./Variant";

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
    quantity!: number;

    @Column("bigint")
    @IsInt()
    price!: number;

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    SKU!: string;


    @ManyToOne(() => Product, product => product.productVariations)
    product!: Product;


    @ManyToMany(() => Variant)
    @JoinTable()
    variants!: Variant[];


}