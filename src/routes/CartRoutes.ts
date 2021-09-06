// @ts-ignore
import {BaseRouteConfig} from './BaseRouteConfig';
import express from "express";
import JWTMiddleware from "../middlewares/JWTMiddleware";
import CartController from "../controllers/CartController";
import ProductMiddleware from "../middlewares/ProductMiddleware";
import CartMiddleware from "../middlewares/CartMiddleware";

export class CartRoutes extends BaseRouteConfig {


    constructor(app: express.Application) {
        super(app, 'CartRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route('/cart/items')
            .get(JWTMiddleware.validJWTNeeded,
                CartController.getCartItems)
            .post(CartController.addToCartItems);


        this.app.param(`itemId`, CartMiddleware.extractCartId);
        this.app.route('/cart/items/:itemId')
            .patch(JWTMiddleware.validJWTNeeded,CartController.editCartItem)
            .delete(JWTMiddleware.validJWTNeeded,CartController.deleteCartItem)

        return this.app;
    }

}