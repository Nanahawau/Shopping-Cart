"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var typeorm_1 = require("typeorm");
// @ts-ignore
var Audit_1 = require("./Audit");
var Inventory_1 = require("./Inventory");
var Category_1 = require("./Category");
var Discount_1 = require("./Discount");
var Metadata_1 = require("./Metadata");
var Variant_1 = require("./Variant");
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Product.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 200 })
    ], Product.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 500 })
    ], Product.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column("bigint")
    ], Product.prototype, "price", void 0);
    __decorate([
        typeorm_1.Column("bigint")
    ], Product.prototype, "quantity", void 0);
    __decorate([
        typeorm_1.Column("bigint")
    ], Product.prototype, "actualPrice", void 0);
    __decorate([
        typeorm_1.Column(function () { return Audit_1.Audit; })
    ], Product.prototype, "audit", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return Inventory_1.Inventory; }, function (inventory) { return inventory.product; }),
        typeorm_1.JoinColumn()
    ], Product.prototype, "inventory", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return Category_1.Category; }, function (category) { return category.product; }),
        typeorm_1.JoinColumn()
    ], Product.prototype, "category", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return Discount_1.Discount; }, function (discount) { return discount.product; }),
        typeorm_1.JoinColumn()
    ], Product.prototype, "discount", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return Metadata_1.Metadata; }, function (metadata) { return metadata.product; }),
        typeorm_1.JoinColumn()
    ], Product.prototype, "metadata", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return Variant_1.Variant; }),
        typeorm_1.JoinTable()
    ], Product.prototype, "variants", void 0);
    Product = __decorate([
        typeorm_1.Entity({ name: 'Product' })
    ], Product);
    return Product;
}(typeorm_1.BaseEntity));
exports.Product = Product;
