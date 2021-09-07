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

    /**
     * Get Cart Items of Logged In User
     * @param request
     * @param response
     */
    async getCartItems(request: express.Request, response: express.Response) {

        let cart;

        try {
            // Get logged in user
            const user = await AuthService.findByEmail(response.locals.jwt.email);

            // Fetch active cart of logged in user
            cart = await CartService.findCartItemByUserAndStatus(user, CartStatus.ACTIVE);

            // Check if user has an items in cart
            if (cart.length == 0) {
                return response.status(200).send(new Response(200, 'User has no item in cart', cart));
            }
        } catch (error) {
            log('getCartItems error: %O', error);
            return response
                .status(500)
                .send(new ErrorResponse(100, `An error occurred while fetching Cart items`, ''));
        }

            return response.status(200).send(new Response(200, 'Success', cart));
    }

    /**
     * Add an item to Cart for logged in user
     * @param request
     * @param response
     */
    async addToCartItems(request: express.Request, response: express.Response) {

        let cart, productVariant;

        try {
            // Get logged in user
            const user = await AuthService.findByEmail(response.locals.jwt.email);
            // Get active cart of logged In user
            cart = await CartService.findCartByUserAndStatus(user, CartStatus.ACTIVE);
            // Get product variant
            productVariant = await ProductService.findProductVariationsById(request.body.productVariantId);

            if (!cart) {
                await CartService.createCart(user, request.body.quantity, productVariant);
            }

            // TODO: check if product variant exists in cart, then increment quantity

        } catch (error) {
            log('addToCartItems', error)
            return response.status(500).send(new Response(100, 'An error occurred while adding item to cart', []));
        }
            await CartService.addToCartItems(cart, request.body.quantity, productVariant);
            return response.status(200).send(new Response(200, 'Success', []));
    }

    /**
     * Delete an item from cart
     * @param request
     * @param response
     */

    async deleteCartItem(request: express.Request, response: express.Response) {
        try {

            await CartService.deleteCartItem(request.params.itemId);
            return response.status(200).send(new Response(200, 'Success', []));

        } catch (error) {
            log(error)
            return response.status(500).send(new Response(100, 'An error occurred while deleting item from cart', []));
        }
    }


    /**
     * Delete entire cart object
     * @param request
     * @param response
     */
    async deleteCart(request: express.Request, response: express.Response) {
        try {
            await CartService.deleteCart(request.params.cartId);
            return response.status(200).send(new Response(200, 'Success', []));
        } catch (error) {
            log(error)
            return response.status(200).send(new Response(100, 'An error occurred while deleting cart', []));
        }
    }

}


export default new CartController();