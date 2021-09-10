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
        try {
            // Get logged in user
            const user = await AuthService.findByEmail(response.locals.jwt.email);
            // Fetch active cart of logged in user
           const cart = await CartService.findCartItemByUserAndStatus(user, CartStatus.ACTIVE);
            // Check if user has an items in cart
            if (cart.length == 0) {
                return response.status(200).send(new Response(200, 'User has no item in cart', cart));
            }
            return response.status(200).send(new Response(200, 'Success', cart));
        } catch (error) {
            log('getCartItems error: %O', error);
            return response
                .status(500)
                .send(new ErrorResponse(100, `An error occurred while fetching Cart items`, ''));
        }
    }

    /**
     * Add an item to Cart for logged in user
     * @param request
     * @param response
     */
    async addToCartItems(request: express.Request, response: express.Response) {
        try {
            // Get product variant
            const productVariant = await ProductService.findProductVariationsById(request.body.productVariantId);

            if (CartService.isQuantityGreaterThanStockLevel(productVariant, request.body.quantity)) {
                return response.status(400)
                    .send(new Response(400, 'Quantity exceed currently available'));
            }

            // Get logged in user
            const user = await AuthService.findByEmail(response.locals.jwt.email);

            // Get active cart of logged In user
            let cart = await CartService.findCartByUserAndStatus(user, CartStatus.ACTIVE);

            // if user does not have a cart, create one while initializing it with the request body.
            if (!cart) {
                cart = await CartService.createCart(user, request.body.quantity, productVariant);
            } else {
                // Check if Product variant already exists in cart.
                const cartItem = await CartService.isProductVariantInCart(productVariant);

                // if yes, increase quantity of variant.
                if (cartItem) {
                    await CartService.updateQuantity(cartItem, request.body.quantity, cart);
                } else {
                    await CartService.addToCartItems(cart, request.body.quantity, productVariant);
                }
            }

            return response.status(201)
                .send(new Response(201, 'Success', {
                    id: cart.id,
                    quantity: request.body.quantity,
                }));
        } catch (error) {
            console.log(error);
            log('addToCartItems', error)
            return response.status(500).send(new Response(100, 'An error occurred while adding item to cart'));
        }

    }

    /**
     * Delete an item from cart
     * @param request
     * @param response
     */

    async deleteCartItem(request: express.Request, response: express.Response) {
        try {
            await CartService.delete(request.params.itemId);
            return response.status(200).send(new Response(200, 'Success', []));

        } catch (error) {
            console.log(error)
            return response.status(500).send(new Response(100, 'An error occurred while deleting item from cart'));
        }
    }


    /**
     * Delete entire cart object
     * @param request
     * @param response
     */
    async deleteCart(request: express.Request, response: express.Response) {
        try {
            // Get logged in user
            const user = await AuthService.findByEmail(response.locals.jwt.email);

            console.log(user.carts.length + 'carts');
            // check if user has no cart
            if (user.carts.length == 0) {
                // when user has no cart
                return response.status(404).send(new Response(404, 'User has no cart', []));
            }

            await CartService.deleteCart(user);
            return response.status(200).send(new Response(200, 'Success', []));

        } catch (error) {
            log(error)
            return response.status(200).send(new Response(100, 'An error occurred while deleting cart'));
        }
    }

}


export default new CartController();