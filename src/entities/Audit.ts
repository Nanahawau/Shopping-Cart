import {Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

export class Audit {

    @Column("varchar", { length: 200 })
    createdBy!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @Column()
    modifiedBy!: string;

    @UpdateDateColumn()
    modifiedAt!: Date;


}