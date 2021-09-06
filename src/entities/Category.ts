import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
import {IsNotEmpty, IsString} from "class-validator";

@Entity({name: 'Category'})
export class Category {

    @PrimaryGeneratedColumn()
    id! : number

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    description!: string;



    @OneToOne(() => Product, product => product.category)
    product!: Product;

}