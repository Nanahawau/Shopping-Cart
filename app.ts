/**
 * Required External Modules
 */
import dotenv from 'dotenv';

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

import express, {Application} from 'express';
import cors from 'cors';
import * as http from 'http';
import debug from 'debug';
import bodyParser from "body-parser";
// @ts-ignore
import {BaseRouteConfig} from "./src/routes/BaseRouteConfig";
import * as expressWinston from 'express-winston';
import winston, {error} from "winston";
// @ts-ignore
import {CartRoutes} from "./src/routes/CartRoutes";
import helmet from 'helmet';
// @ts-ignore
import databaseConfig from "./src/utilities/database/connection";
import {createConnection} from "typeorm";
import {ProductRoutes} from "./src/routes/ProductRoutes";
import {AuthRoutes} from "./src/routes/AuthRoutes";


// Module that helps load env variables from .env file

/**
 * App Variables
 */

const debugLog: debug.IDebugger = debug('app');
const PORT: number = parseInt(process.env.PORT as string, 10);
export const app: express.Application = express();
// let server: http.Server = http.createServer(app);
const routes: Array<BaseRouteConfig> = [];


//Middleware used to enable cors
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all: true})
    ),
};


app.use(expressWinston.logger(loggerOptions));

routes.push(new ProductRoutes(app));
routes.push(new CartRoutes(app));
routes.push(new AuthRoutes(app));


/**
 * Server & DB Activation
 */
createConnection().then(r => {
}).catch(error => {
    console.log(error);
});

const runningMessage = `Server running at http://localhost:${PORT}`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});




// export default server.listen(PORT, () => {
//     debugLog(`Server running at http://localhost:${PORT}`);
//     routes.forEach((route: BaseRouteConfig) => {
//         console.log(`Routes configured for ${route.name}`);
//     });
// });
