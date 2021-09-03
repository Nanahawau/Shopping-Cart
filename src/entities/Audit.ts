import {Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

export class Audit {

    @Column("varchar", { length: 200 })
    createdBy!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @Column("varchar", { length: 200 })
    modifiedBy!: string;

    @UpdateDateColumn()
    modifiedAt!: Date;


}