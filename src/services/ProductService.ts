import {CRUD} from "./interfaces/CRUD";
import {getConnection} from "typeorm";
import {Product} from "../entities/Product";
import exp from "constants";

class ProductService implements CRUD {
    create(resource: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    deleteById(id: string): Promise<string> {
        return Promise.resolve("");
    }

    list(limit: number, page: number): Promise<any> {
        return getConnection().getRepository(Product).find({
            select: ['id', 'name', 'description'],
            relations: ['brand', 'category', 'productVariations'],
            skip: (page - 1) * limit,
            take: limit
        });
    }

    patchById(id: string, resource: any): Promise<string> {
        return Promise.resolve("");
    }

    putById(id: string, resource: any): Promise<string> {
        return Promise.resolve("");
    }

    readById(id: string): Promise<any> {
        return getConnection().getRepository(Product).findOne(id,
            {relations: ['brand', 'category', 'productVariations', 'productVariations.variants']});
    }

}

export default new ProductService();