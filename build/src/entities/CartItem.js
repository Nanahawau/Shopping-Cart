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
exports.CartItem = void 0;
var typeorm_1 = require("typeorm");
var Audit_1 = require("./Audit");
var Cart_1 = require("./Cart");
var CartItem = /** @class */ (function (_super) {
    __extends(CartItem, _super);
    function CartItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], CartItem.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column("bigint")
    ], CartItem.prototype, "price", void 0);
    __decorate([
        typeorm_1.Column("bigint")
    ], CartItem.prototype, "discount", void 0);
    __decorate([
        typeorm_1.Column("bigint")
    ], CartItem.prototype, "quantity", void 0);
    __decorate([
        typeorm_1.Column(function () { return Audit_1.Audit; })
    ], CartItem.prototype, "audit", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Cart_1.Cart; }, function (cart) { return cart.cartItems; })
    ], CartItem.prototype, "cart", void 0);
    CartItem = __decorate([
        typeorm_1.Entity({ name: 'CartItem' })
    ], CartItem);
    return CartItem;
}(typeorm_1.BaseEntity));
exports.CartItem = CartItem;
