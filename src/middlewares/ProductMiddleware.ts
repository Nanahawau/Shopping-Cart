import debug from "debug";
import express from "express";
import ProductService from "../services/ProductService";
import {StatusCodes} from "../enums/StatusCodes";

const log: debug.IDebugger = debug('app:product-controller');

class ProductMiddleware {
    async validateProductExists(request: express.Request,
                                response: express.Response,
                                next: express.NextFunction) {

        const product = await ProductService.readById(request.body.id);
        if(!product) {
            response.status(StatusCodes.NOT_FOUND).send({error: `Product doesn't exist`})
        } else {
            next();
        }

    }

    async extractProductId(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) {
        request.body.id = request.params.productId;
        next();
    }
}


export default new ProductMiddleware();