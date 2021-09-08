import {Connection, createConnection, getConnection} from "typeorm";
import Database from "better-sqlite3";
import {hash} from "argon2";
import {UserSeed} from "../seeders/user.seed";
import {User} from "../entities/User";
import {Brand} from "../entities/Brand";
import {BrandSeed, BrandSeed2} from "../seeders/brand.seed";
import {Variant} from "../entities/Variant";
import {VariantSeedColor, VariantSeedFlavor, VariantSeedSize} from "../seeders/variant.seed";
import {
    VariantValue13,
    VariantValue15,
    VariantValueBlack, VariantValueFlavor,
    VariantValueRed,
    VariantValueWhite
} from "../seeders/variantvalue.seed";
import {VariantValue} from "../entities/VariantValue";
import {Category} from "../entities/Category";
import {CategorySeed, CategorySeed1} from "../seeders/category.seed";
import {ProductSeed, ProductSeed1} from "../seeders/product.seed";
import {Product} from "../entities/Product";
import {
    ProductVariantsDrinks,
    ProductVariantsSeed13B,
    ProductVariantsSeed13R,
    ProductVariantsSeed13W
} from "../seeders/productvariants.seed";
import {ProductVariation} from "../entities/ProductVariation";

export class TestHelper {
    private static _instance: TestHelper;

    private constructor() {}

    public static get instance(): TestHelper {
        if(!this._instance) this._instance = new TestHelper();

        return this._instance;
    }

    private dbConnect!: Connection;
    private testdb!: any;


    async setupTestDB() {
        this.testdb = new Database(':memory:', { verbose: console.log });
        this.dbConnect = await createConnection({
            name: 'default',
            type: 'better-sqlite3',
            database: ':memory:',
            entities: ['src/entities/**/*.ts'],
            synchronize: true,
            migrations: ['src/migrations/**/*.ts'],
            migrationsRun: true,
            // logging: true
        });

    }

    teardownTestDB() {
        this.dbConnect.close();
        this.testdb.close();
    }
}