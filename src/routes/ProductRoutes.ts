import {BaseRouteConfig} from "./BaseRouteConfig";
import express from "express";
import ProductMiddleware from "../middlewares/ProductMiddleware";
import ProductController from "../controllers/ProductController";
import Validators from "../middlewares/Validators";
import JWTMiddleware from "../middlewares/JWTMiddleware";

export class ProductRoutes extends BaseRouteConfig {

    constructor(app: express.Application) {
        super(app, 'ProductRoutes');
    }


    configureRoutes(): express.Application {
        this.app
            .route(`/products`)
            .all(Validators.validate)
            .get(Validators.validatePaginationObject,
                Validators.length,
                JWTMiddleware.validJWTNeeded,
                ProductController.getAllProducts);


        this.app.param(`productId`, ProductMiddleware.extractProductId);
        this.app
            .route(`/products/:productId`)
            .all(ProductMiddleware.validateProductExists)
            .get(JWTMiddleware.validJWTNeeded,
                ProductController.getAProduct)

        return this.app;
    }

}