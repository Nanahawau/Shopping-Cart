import {createConnection, Connection} from 'typeorm';
import {error} from "winston";


// @ts-ignore
const databaseConfig : ConnectionOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
    synchronize: true,
};



export default databaseConfig;


