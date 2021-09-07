import debug from "debug";
import express from "express";
import ProductService from "../services/ProductService";
import {StatusCodes} from "../enums/StatusCodes";
import {Response} from "../models/Response";
import {ErrorResponse} from "../models/ErrorResponse";

const log: debug.IDebugger = debug('app:product-controller');


class ProductController {
    /**
     * Get all Products
     * @param request
     * @param response
     */
    async getAllProducts(request: express.Request, response: express.Response) {
        try {
            const products = await ProductService.list(parseInt(<string>request.query.limit), parseInt(<string>request.query.page));
            return response.status(StatusCodes.OK).send(new Response(StatusCodes.OK, "Success", products));
        } catch (error) {
            log(error)
            return response
                .status(500)
                .send(new ErrorResponse(100, `An error occurred while fetching Products`, ''));
        }

    }

    /**
     * Get a Product
     * @param request
     * @param response
     */
    async getAProduct(request: express.Request, response: express.Response) {
        try {
            const product = await ProductService.readById(request.params.productId);
           return response.status(StatusCodes.OK).send(new Response(StatusCodes.OK, "Success", product));
        }catch (error) {
            log(error)
            return response
                .status(500)
                .send(new ErrorResponse(100, `An error occurred while fetching Product`, ''));
        }

    }
}


export default new ProductController();