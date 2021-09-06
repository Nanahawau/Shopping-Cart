import express from "express";

export abstract class BaseRouteConfig {
    app: express.Application;
    _name: string;


    constructor(app: express.Application, name: string) {
        this.app = app;
        this._name = name;
        this.configureRoutes();
    }


    get name(): string {
        return this._name;
    }

    abstract configureRoutes(): express.Application;
}