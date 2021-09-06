import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, IsString} from "class-validator";
import {Product} from "./Product";

@Entity({name: 'Brand'})
export class Brand {

    @PrimaryGeneratedColumn()
    id!: number

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    name!: string


    @OneToOne(() => Product, product => product.brand)
    product!: Product;

}