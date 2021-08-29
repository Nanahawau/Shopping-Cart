import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'Product'})
export class Product {

    @PrimaryGeneratedColumn()
    id! : number

}