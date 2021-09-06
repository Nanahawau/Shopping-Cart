import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsInt, IsNotEmpty, IsString} from "class-validator";

import {VariantValue} from "./VariantValue";

import {ProductVariation} from "./ProductVariation";

@Entity({name: 'Variants'})
export class Variant {

    @PrimaryGeneratedColumn()
    id! : number

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    name!: string;


    @OneToMany(() => VariantValue, variantValue => variantValue.variant)
    variantValues!: VariantValue[];


    @ManyToOne(() => ProductVariation, productVariation => productVariation.variants)
    productVariation!: ProductVariation;


}