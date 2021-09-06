// @ts-ignore
import {BaseRouteConfig} from './BaseRouteConfig';
import express from "express";

export class CartRoutes extends BaseRouteConfig {


    constructor(app: express.Application) {
        super(app, 'CartRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route('/cart/items')
            .get(() => {

            })
            .post(() => {

            });


        this.app.route('/cart/items/:itemId')
            .get(() => {

            })
            .put(() => {

            })
            .delete(() => {

            })

        return this.app;
    }

}