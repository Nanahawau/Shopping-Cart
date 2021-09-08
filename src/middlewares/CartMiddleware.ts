import express from "express";
import {StatusCodes} from "../enums/StatusCodes";
import {ErrorResponse} from "../models/ErrorResponse";
import CartService from "../services/CartService";
import AuthService from "../services/AuthService";
import {CartStatus} from "../enums/CartStatus";


class CartMiddleware {
    async validateCartExists(request: express.Request,
                                response: express.Response,
                                next: express.NextFunction) {

        // Get logged in user
        const user = await AuthService.findByEmail(response.locals.jwt.email);
        const cart = await CartService.findCartItemByUserAndStatus(user, CartStatus.ACTIVE);

        if(!cart) {
            response.status(StatusCodes.NOT_FOUND).send(new ErrorResponse(404, `Not Found`))
        } else {
            next();
        }

    }



    async validateCartItemExists(request: express.Request,
                             response: express.Response,
                             next: express.NextFunction) {

        const cartItem = await CartService.findCartItemById(parseInt(request.body.id));
        if(!cartItem) {
            response.status(StatusCodes.NOT_FOUND).send(new ErrorResponse(404, 'Not Found'))
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


    // async extractCartId(
    //     request: express.Request,
    //     response: express.Response,
    //     next: express.NextFunction
    // ) {
    //     request.body.id = request.params.cartId;
    //     next();
    // }
}


export default new CartMiddleware();