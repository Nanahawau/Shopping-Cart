import express from "express";
import ProductService from "../services/ProductService";
import {StatusCodes} from "../enums/StatusCodes";
import {ErrorResponse} from "../models/ErrorResponse";
import CartService from "../services/CartService";

class CartMiddleware {
    async validateCartExists(request: express.Request,
                                response: express.Response,
                                next: express.NextFunction) {

        const cartItem = await CartService.findById(request.body.id);
        if(!cartItem) {
            response.status(StatusCodes.NOT_FOUND).send(new ErrorResponse(404, 'Bad Request', []))
        } else {
            next();
        }

    }

    async extractCartItemId(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) {
        request.body.id = request.params.itemId;
        next();
    }


    async extractCartId(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) {
        request.body.id = request.params.cartId;
        next();
    }
}


export default new CartMiddleware();