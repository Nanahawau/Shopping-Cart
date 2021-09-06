import {BaseRouteConfig} from "./BaseRouteConfig";
import express from "express";
import ProductMiddleware from "../middlewares/ProductMiddleware";
import ProductController from "../controllers/ProductController";
import Validators from "../middlewares/Validators";

export class ProductRoutes extends BaseRouteConfig {

    constructor(app: express.Application) {
        super(app, 'ProductRoutes');
    }


    configureRoutes(): express.Application {
        this.app
            .route(`/products`)
            .all(Validators.validatePaginationObject)
            .get(ProductController.getAllProducts);


        this.app.param(`productId`, ProductMiddleware.extractProductId);
        this.app
            .route(`/products/:productId`)
            .all(ProductMiddleware.validateProductExists)
            .get(ProductController.getAProduct)

        return this.app;
    }

}