import {getConnection, getCustomRepository, getRepository} from "typeorm";
import {Product} from "../entities/Product";
import {ProductVariation} from "../entities/ProductVariation";
import {User} from "../entities/User";

class ProductService {

    /**
     * This method fetches a paginated list of products and it's relations
     * @param limit
     * @param page
     */
    list(limit: number, page: number): Promise<any> {
        return getRepository(Product).find({
            select: ['id', 'name', 'description'],
            skip: (page - 1) * limit,
            take: limit,
            relations: ['brand', 'category', 'productVariations'],
        });
    }

    /**
     * This methods fetches a product by id
     * @param id
     */
    readById(id: string): Promise<any> {
        return getRepository(Product).findOne(id,
            {relations: ['brand', 'category', 'productVariations', 'productVariations.variants']});
    }

    /**
     * This method fetches a product variation by id.
     * @param id
     */
    findProductVariationsById(id: number): Promise<any> {
        return getRepository(ProductVariation).findOne(id);
    }
}

export default new ProductService();