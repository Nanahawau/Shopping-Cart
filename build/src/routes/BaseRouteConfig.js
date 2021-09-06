"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouteConfig = void 0;
var BaseRouteConfig = /** @class */ (function () {
    function BaseRouteConfig(app, name) {
        this.app = app;
        this._name = name;
    }
    Object.defineProperty(BaseRouteConfig.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    return BaseRouteConfig;
}());
exports.BaseRouteConfig = BaseRouteConfig;
