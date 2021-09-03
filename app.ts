/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express, {Application} from 'express';
import cors from 'cors';
import debug from 'debug';
import bodyParser from "body-parser";
// @ts-ignore
import {BaseRouteConfig} from "./src/routes/BaseRouteConfig";
import * as expressWinston from 'express-winston';
import winston from "winston";
// @ts-ignore
import {CartRoutes} from "./src/routes/CartRoutes";
// @ts-ignore
import databaseConfig from "./src/utilities/database/connection";
import {createConnection} from "typeorm";


class App {

    public app: Application;

    constructor() {
        this.app = express();
        this.setConfig();
    }


    private setConfig() {
        // Module that helps load env variables from .env file
        dotenv.config();

        /**
         * App Variables
         */

//TODO : fix debug
        const info: debug.IDebugger = debug('app');
        const PORT: number = parseInt(process.env.PORT as string, 10);
        const app = express();
        const routes: Array<BaseRouteConfig> = [];

        //Middleware used to enable cors
        app.use(cors());
        app.use(express.json());
        app.use(bodyParser.json());

        const loggerOptions: expressWinston.LoggerOptions = {
            transports: [new winston.transports.Console()],
            format: winston.format.combine(
                winston.format.json(),
                winston.format.prettyPrint(),
                winston.format.colorize({ all: true })
            ),
        };



        app.use(expressWinston.logger(loggerOptions));
        routes.push(new CartRoutes(app));




        /**
         * App Configuration
         */

//Middleware that helps set http header

        // TODO: check if still needed
//         app.use(helmet());



        /**
         * Server Activation
         */
        createConnection(databaseConfig)
            .then((_connection) => {
                app.listen(PORT, () => {
                    info(`Server is running on port, ${PORT}`);
                });

                routes.forEach((route: BaseRouteConfig) => {
                    info(`Routes configured for ${route.name}`);
                });
            })
            .catch((err) => {
                info("Unable to connect to db", err);
                process.exit(1);
            });
        // app.listen(PORT, () => {
        //     info(`Listening on port ${PORT}`);
        //     routes.forEach((route: BaseRouteConfig) => {
        //         debug(`Routes configured for ${route.name}`);
        //     });
        // });
    }

}

// Singleton Class: On start up, instantiates class.
export default new App().app;

