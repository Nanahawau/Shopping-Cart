import express from "express";

export abstract class BaseRouteConfig {
    app: express.Application;
    private _name: string;


    constructor(app: express.Application, name: string) {
        this.app = app;
        this._name = name;
    }


    get name(): string {
        return this._name;
    }

    abstract configureRoutes(): express.Application;
}