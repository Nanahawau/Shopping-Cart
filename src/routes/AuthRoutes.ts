import {BaseRouteConfig} from "./BaseRouteConfig";
import express from "express";
import Validators from "../middlewares/Validators";
import ProductController from "../controllers/ProductController";
import ProductMiddleware from "../middlewares/ProductMiddleware";
import {body} from "express-validator";
import BodyValidationMiddleware from "../middlewares/BodyValidationMiddleware";
import AuthController from "../controllers/AuthController";

export class AuthRoutes extends BaseRouteConfig {

    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }


    configureRoutes(): express.Application {
        this.app.post(`/login`, [
            body('email').isEmail(),
            body('password').isString(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            AuthController.login
        ]);
        return this.app;
    }

}