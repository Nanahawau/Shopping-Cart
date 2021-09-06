
import {getConnection, getCustomRepository} from "typeorm";
import {Product} from "../entities/Product";

class ProductService {

    list(limit: number, page: number): Promise<any> {
        return getConnection().getRepository(Product).find({
            select: ['id', 'name', 'description'],
            skip: (page - 1) * limit,
            take: limit,
            relations: ['brand', 'category', 'productVariations'],
        });
    }

    readById(id: string): Promise<any> {
        return getConnection().getRepository(Product).findOne(id,
            {relations: ['brand', 'category', 'productVariations', 'productVariations.variants']});
    }
}

export default new ProductService();