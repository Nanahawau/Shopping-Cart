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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
// @ts-ignore
var BaseRouteConfig_1 = require("./BaseRouteConfig");
var CartRoutes = /** @class */ (function (_super) {
    __extends(CartRoutes, _super);
    function CartRoutes(app) {
        return _super.call(this, app, 'CartRoutes') || this;
    }
    CartRoutes.prototype.configureRoutes = function () {
        this.app.route('/cart')
            .get();
        return this.app;
    };
    return CartRoutes;
}(BaseRouteConfig_1.BaseRouteConfig));
exports.CartRoutes = CartRoutes;
