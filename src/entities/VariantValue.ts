import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsInt, IsNotEmpty, IsString} from "class-validator";
import {User} from "./User";
import {Variant} from "./Variant";

@Entity({name: 'VariantValues'})
export class VariantValue {

    @PrimaryGeneratedColumn()
    id! : number

    @Column("varchar", { length: 200 })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ManyToOne(() => Variant, variant => variant.variantValues)
    variant!: Variant;

}