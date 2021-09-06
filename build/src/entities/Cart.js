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
exports.Cart = void 0;
var typeorm_1 = require("typeorm");
var Audit_1 = require("./Audit");
var CartStatus_1 = require("../enums/CartStatus");
var User_1 = require("./User");
var CartItem_1 = require("./CartItem");
var Cart = /** @class */ (function (_super) {
    __extends(Cart, _super);
    function Cart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Cart.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 200 })
    ], Cart.prototype, "sessionId", void 0);
    __decorate([
        typeorm_1.Column("bigint")
    ], Cart.prototype, "total", void 0);
    __decorate([
        typeorm_1.Column({
            type: "enum",
            enum: CartStatus_1.CartStatus,
            default: CartStatus_1.CartStatus.ACTIVE
        })
    ], Cart.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column(function () { return Audit_1.Audit; })
    ], Cart.prototype, "audit", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return CartItem_1.CartItem; }, function (cartItem) { return cartItem.cart; })
    ], Cart.prototype, "cartItems", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.carts; })
    ], Cart.prototype, "user", void 0);
    Cart = __decorate([
        typeorm_1.Entity({ name: 'Cart' })
    ], Cart);
    return Cart;
}(typeorm_1.BaseEntity));
exports.Cart = Cart;
