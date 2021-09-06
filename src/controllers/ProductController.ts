import debug from "debug";
import express from "express";
import ProductService from "../services/ProductService";
import {StatusCodes} from "../enums/StatusCodes";
import {Response} from "../models/Response";

const log: debug.IDebugger = debug('app:product-controller');

class ProductController {
    async getAllProducts(request: express.Request, response: express.Response) {
        const products = await ProductService.list(parseInt(request.body.page), parseInt(request.body.limit));
        response.status(StatusCodes.OK).send(new Response(StatusCodes.OK, "Success", products));
    }

    async getAProduct(request: express.Request, response: express.Response) {
        const product = await ProductService.readById(request.params.productId);
        response.status(StatusCodes.OK).send(new Response(StatusCodes.OK, "Success", product));
    }
}


export default new ProductController();