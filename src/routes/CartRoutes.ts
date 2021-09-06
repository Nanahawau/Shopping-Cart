// @ts-ignore
import {BaseRouteConfig} from './BaseRouteConfig';
import express from "express";
import JWTMiddleware from "../middlewares/JWTMiddleware";
import CartController from "../controllers/CartController";
import ProductMiddleware from "../middlewares/ProductMiddleware";
import CartMiddleware from "../middlewares/CartMiddleware";
import {body} from "express-validator";
import BodyValidationMiddleware from "../middlewares/BodyValidationMiddleware";
import AuthController from "../controllers/AuthController";

export class CartRoutes extends BaseRouteConfig {


    constructor(app: express.Application) {
        super(app, 'CartRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route('/cart/items')
            .get(JWTMiddleware.validJWTNeeded,
                CartController.getCartItems)
            .post([
                body('productVariantId').isInt(),
                body('quantity').isInt(),
                JWTMiddleware.validJWTNeeded,
                ProductMiddleware.validateProductVariantExists,
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                CartController.addToCartItems
            ]);

        this.app.param(`itemId`, CartMiddleware.extractCartItemId);
        this.app.route('/cart/items/:itemId')
            .delete(JWTMiddleware.validJWTNeeded,
                CartController.deleteCartItem)


        this.app.param(`cartId`, CartMiddleware.extractCartId);
        this.app.route(`/cart/:cartId`)
            .delete(JWTMiddleware.validJWTNeeded,
                    CartController.deleteCart)

        return this.app;
    }

}