import debug from "debug";
import express from "express";
import CartService from "../services/CartService";
import {CartStatus} from "../enums/CartStatus";
import {Response} from "../models/Response";
import {ErrorResponse} from "../models/ErrorResponse";
import AuthService from "../services/AuthService";
import ProductService from "../services/ProductService";

const log: debug.IDebugger = debug('app:cart-controller');

class CartController {

    async getCartItems(request: express.Request, response: express.Response) {
        try {
            const user = await AuthService.findByEmail(response.locals.jwt.email);
            const cart = await CartService.findCartItemByUserAndStatus(user, CartStatus.ACTIVE);
            if (cart.length > 0) {
                return response.status(200).send(new Response(200, 'Success', cart));
            } else {
                return response.status(200).send(new Response(200, 'User has no item in cart', cart));
            }
        } catch (error) {
            console.log(error);
            log(error);
            return response
                .status(200)
                .send(new ErrorResponse(100, `An error occurred while fetching Cart items`, ''));
        }
    }

    async addToCartItems(request: express.Request, response: express.Response) {
        try {
            const user = await AuthService.findByEmail(response.locals.jwt.email);
            const cart = await CartService.findCartByUserAndStatus(user, CartStatus.ACTIVE);
            const productVariant = await ProductService.findProductVariationsById(request.body.productVariantId);
            if (!cart) {
                await CartService.createCart(user, request.body.quantity, productVariant);
            }
            // else if (cart && ) {
            //
            // }
            else {
                await CartService.addToCartItems(cart, request.body.quantity, productVariant);
            }
            return response.status(200).send(new Response(200, 'Success', []));
        } catch (error) {
            console.log(error)
            log(error)
            return response.status(200).send(new Response(100, 'An error occurred while adding item to cart', []));
        }
    }


    async deleteCartItem(request: express.Request, response: express.Response) {
         try {
            await CartService.deleteCartItem(request.params.itemId);
             return response.status(200).send(new Response(200, 'Success', []));
         } catch (error) {
             console.log(error)
             log(error)
             return response.status(200).send(new Response(100, 'An error occurred while deleting item from cart', []));
         }
    }


    async deleteCart (request: express.Request, response: express.Response) {
        try {
            await CartService.deleteCart(request.params.cartId);
            return response.status(200).send(new Response(200, 'Success', []));
        } catch (error) {
            console.log(error)
            log(error)
            return response.status(200).send(new Response(100, 'An error occurred while deleting cart', []));
        }
    }

}


export default new CartController();