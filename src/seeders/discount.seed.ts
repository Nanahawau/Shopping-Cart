import {DiscountType} from "../enums/DiscountType";

export const DiscountSeed =
    {
        name: 'Black Friday',
        description: 'Black Friday Sales Discount',
        active: true,
        type: DiscountType.AMOUNT,
        value: 200,
        // audit: auditSeed,
    }


