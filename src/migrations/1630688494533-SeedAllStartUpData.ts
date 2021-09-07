import {createConnection, getConnection, MigrationInterface, QueryRunner} from "typeorm";
import {CategorySeed, CategorySeed1} from "../seeders/category.seed";
import {UserSeed} from "../seeders/user.seed";
import {ProductSeed, ProductSeed1} from "../seeders/product.seed";
import {User} from "../entities/User";
import {Category} from "../entities/Category";
import {Product} from "../entities/Product";
import {ProductVariation} from "../entities/ProductVariation";
import {VariantSeedColor, VariantSeedFlavor, VariantSeedSize} from "../seeders/variant.seed";
import {Variant} from "../entities/Variant";
import {VariantValue} from "../entities/VariantValue";
import {
    VariantValue13,
    VariantValue15, VariantValueBlack, VariantValueFlavor,
    VariantValueRed,
    VariantValueWhite
} from "../seeders/variantvalue.seed";
import {Brand} from "../entities/Brand";
import {BrandSeed, BrandSeed2} from "../seeders/brand.seed";
import {
    ProductVariantsDrinks,
    ProductVariantsSeed13B,
    ProductVariantsSeed13R,
    ProductVariantsSeed13W
} from "../seeders/productvariants.seed";
import {hash} from "argon2";



/**
 * Ordinarily migrations are used for making changes to tables.
 * Typeorm has no inbuilt feature for handling seeding, so this is sort of a hack.
 */
export class SeedAllStartUpData1630688494533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const passwordHash =  await hash('admin');
        const user : any = UserSeed;
        user.password = passwordHash;
        await getConnection().getRepository(User).save(user);

        const brand = await getConnection().getRepository(Brand).save(BrandSeed);

        const brand2 = await getConnection().getRepository(Brand).save(BrandSeed2);

        const color = await getConnection().getRepository(Variant).save(VariantSeedColor);
        const size = await getConnection().getRepository(Variant).save(VariantSeedSize);
        const flavor = await getConnection().getRepository(Variant).save(VariantSeedFlavor);

        const VariantValueT : any = VariantValue13;
        VariantValueT.variant = size;

        const VariantValueF : any = VariantValue15;
        VariantValueF.variant = size;

        const VariantValueR : any = VariantValueRed;
        VariantValueR.variant = color;

        const VariantValueW : any = VariantValueWhite;
        VariantValueW.variant = color;

        const VariantValueB : any = VariantValueBlack;
        VariantValueB.variant = color;


        const VariantValueFla : any = VariantValueFlavor;
        VariantValueB.variant = flavor;


        const variantValueT = await getConnection().getRepository(VariantValue).save(VariantValueT);
        const variantValueF = await getConnection().getRepository(VariantValue).save(VariantValueF);
        const variantValueR = await getConnection().getRepository(VariantValue).save(VariantValueR);
        const variantValueW = await getConnection().getRepository(VariantValue).save(VariantValueW);
        const variantValueB = await getConnection().getRepository(VariantValue).save(VariantValueB);


        const category = await getConnection().getRepository(Category).save(CategorySeed);
        const category1 = await getConnection().getRepository(Category).save(CategorySeed1);



        const productItems : any = ProductSeed;

        productItems.category = category;
        productItems.brand = brand;

        const productItems1 : any = ProductSeed1;
        // productItems1.inventory = inventory;
        // productItems1.discount = discount;
        productItems1.category = category1;
        productItems1.brand = brand2;



        const product = await getConnection().getRepository(Product).save(productItems);


        const product1 = await getConnection().getRepository(Product).save(productItems1);

        console.log(JSON.stringify(product) + 'product');

        const productVariantItemW : any = ProductVariantsSeed13W;
        productVariantItemW.variants = [size, color];
        productVariantItemW.product = product;


        const productVariantItemB : any = ProductVariantsSeed13B;
        productVariantItemB.variants = [size, color];
        productVariantItemB.product = product;


        const productVariantItemR : any = ProductVariantsSeed13R;
        productVariantItemR.variants = [size, color];
        productVariantItemR.product = product;


        const productVariantItemFlav : any = ProductVariantsDrinks;
        productVariantItemFlav.variants = [flavor];
        productVariantItemFlav.product = product1;

        const productVariantW = await getConnection().getRepository(ProductVariation).save(productVariantItemW);
        const productVariantB = await getConnection().getRepository(ProductVariation).save(productVariantItemB);
        const productVariantR = await getConnection().getRepository(ProductVariation).save(productVariantItemR);
        const productVariantF = await getConnection().getRepository(ProductVariation).save(productVariantItemFlav);



    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
