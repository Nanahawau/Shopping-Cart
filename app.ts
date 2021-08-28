/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express, {Application} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import debug from 'debug';
import bodyParser from "body-parser";


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
        const info: debug.IDebugger = debug('app:app.ts');
        const PORT: number = parseInt(process.env.PORT as string, 10);
        const app = express();


        /**
         * App Configuration
         */

//Middleware that helps set http headers
        app.use(helmet());
//Middleware used to enable cors
        app.use(cors());
        app.use(express.json());
        app.use(bodyParser.json());


        /**
         * Server Activation
         */

        app.listen(PORT, () => {
            info(`Listening on port ${PORT}`);
        });
    }

}

// Singleton Class: On start up, instantiates class.
export default new App().app;

