
import {getConnection, getCustomRepository, getRepository} from "typeorm";
import {Product} from "../entities/Product";
import {ProductVariation} from "../entities/ProductVariation";
import {User} from "../entities/User";

class ProductService {

    list(limit: number, page: number): Promise<any> {
        return getRepository(Product).find({
            select: ['id', 'name', 'description'],
            skip: (page - 1) * limit,
            take: limit,
            relations: ['brand', 'category', 'productVariations'],
        });
    }

    readById(id: string): Promise<any> {
        return getRepository(Product).findOne(id,
            {relations: ['brand', 'category', 'productVariations', 'productVariations.variants']});
    }

    findProductVariationsById(id: number): Promise<any>  {
        return getRepository(ProductVariation).findOne(id);
    }
}

export default new ProductService();