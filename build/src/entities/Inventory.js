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
exports.Inventory = void 0;
var typeorm_1 = require("typeorm");
var Audit_1 = require("./Audit");
var Product_1 = require("./Product");
var Inventory = /** @class */ (function (_super) {
    __extends(Inventory, _super);
    function Inventory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Inventory.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column("bigint")
    ], Inventory.prototype, "quantity", void 0);
    __decorate([
        typeorm_1.Column(function () { return Audit_1.Audit; })
    ], Inventory.prototype, "audit", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return Product_1.Product; }, function (product) { return product.inventory; })
    ], Inventory.prototype, "product", void 0);
    Inventory = __decorate([
        typeorm_1.Entity({ name: 'Inventory' })
    ], Inventory);
    return Inventory;
}(typeorm_1.BaseEntity));
exports.Inventory = Inventory;
