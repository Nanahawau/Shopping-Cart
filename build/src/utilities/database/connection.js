"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var process = __importStar(require("process"));
var User_1 = require("../../entities/User");
var Cart_1 = require("../../entities/Cart");
var CartItem_1 = require("../../entities/CartItem");
var Product_1 = require("../../entities/Product");
var Category_1 = require("../../entities/Category");
var Inventory_1 = require("../../entities/Inventory");
var Metadata_1 = require("../../entities/Metadata");
var Discount_1 = require("../../entities/Discount");
var Variant_1 = require("../../entities/Variant");
//TODO: figure out why env variable isn't seeing Username and password
// @ts-ignore
var databaseConfig = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: 'root',
    password: 'administrator',
    database: 'shopping_cart',
    entities: [
        User_1.User,
        Cart_1.Cart,
        CartItem_1.CartItem,
        Product_1.Product,
        Category_1.Category,
        Inventory_1.Inventory,
        Metadata_1.Metadata,
        Discount_1.Discount,
        Variant_1.Variant
    ],
    migration: [
        "build/migrations/**/*{.js,.ts}"
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
exports.default = databaseConfig;
