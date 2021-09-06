import debug from "debug";
import express from "express";
import CartService from "../services/CartService";
import {CartStatus} from "../enums/CartStatus";
import {Response} from "../models/Response";
import {ErrorResponse} from "../models/ErrorResponse";
import AuthService from "../services/AuthService";

const log: debug.IDebugger = debug('app:cart-controller');

class CartController {

    async getCartItems (request: express.Request, response: express.Response) {
        try {

            console.log(response.locals.jwt.email + "user");
            const user = await AuthService.findByEmail(response.locals.jwt.email);
            const cart = await CartService.findCartByUserAndStatus(user, CartStatus.ACTIVE);
            if (cart) {
                return response.status(200).send(new Response(200, 'Success', cart));
            } else {
                return response.status(200).send(new Response(200, 'User has no item', cart ));
            }
        } catch (error) {
            console.log(error);
            log(error);
            return response
                .status(200)
                .send(new ErrorResponse(100, `An error occurred while fetching Cart items`, ''));
        }
    }

    async addToCartItems (request: express.Request, response: express.Response) {

    }

    async editCartItem (request: express.Request, response: express.Response) {

    }


    async deleteCartItem  (request: express.Request, response: express.Response) {

    }

    async deleteCart (request: express.Request, response: express.Response) {

    }

}


export default new CartController();