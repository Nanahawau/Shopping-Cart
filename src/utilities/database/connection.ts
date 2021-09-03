import {createConnection, Connection} from 'typeorm';
import {error} from "winston";
import * as process from "process";
import {User} from "../../entities/User";
import {Cart} from "../../entities/Cart";
import {CartItem} from "../../entities/CartItem";
import {Product} from "../../entities/Product";
import {Category} from "../../entities/Category";
import {Inventory} from "../../entities/Inventory";
import {Metadata} from "../../entities/Metadata";
import {Discount} from "../../entities/Discount";

//TODO: figure out why env variable isn't seeing Username and password
// @ts-ignore
const databaseConfig : ConnectionOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: 'root',
    password: 'administrator',
    database: 'shopping_cart',
    entities: [
        User,
        Cart,
        CartItem,
        Product,
        Category,
        Inventory,
        Metadata,
        Discount
    ],
    synchronize: true,
};

// const databaseConfig : ConnectionOptions = {
//     type: process.env.TYPEORM_CONNECTION,
//     host: process.env.TYPEORM_HOST,
//     port: Number(process.env.TYPEORM_PORT),
//     username: process.env.TYPEORM_USERNAME,
//     password: process.env.TYPEORM_PASSWORD,
//     database: process.env.TYPEORM_DATABASE,
//     entities: [process.env.TYPEORM_ENTITIES],
//     synchronize: process.env.TYPEORM_SYNCHRONIZE,
// };

export default databaseConfig;


