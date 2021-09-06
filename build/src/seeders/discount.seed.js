"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountSeed = void 0;
var DiscountType_1 = require("../enums/DiscountType");
exports.DiscountSeed = [
    //
    // {
    //     name: 'Black Friday',
    //     description: 'Black Friday Sales Discount',
    //     active: true,
    //     type: DiscountType.PERCENT,
    //     value: 20,
    //     createdBy:'SYSTEM',
    //     createdAt:`${new Date()}`,
    //     modifiedBy: '',
    //     modifiedAt: `${new Date()}`
    // },
    {
        name: 'Black Friday',
        description: 'Black Friday Sales Discount',
        active: true,
        type: DiscountType_1.DiscountType.AMOUNT,
        value: 200,
        createdBy: 'SYSTEM',
        createdAt: "" + new Date(),
        modifiedBy: '',
        modifiedAt: "" + new Date()
    },
];
