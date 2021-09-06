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
exports.Variant = void 0;
var typeorm_1 = require("typeorm");
var Audit_1 = require("./Audit");
var Variant = /** @class */ (function (_super) {
    __extends(Variant, _super);
    function Variant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Variant.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 200 })
    ], Variant.prototype, "variant", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 200 })
    ], Variant.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 200 })
    ], Variant.prototype, "price", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 200 })
    ], Variant.prototype, "SKU", void 0);
    __decorate([
        typeorm_1.Column(function () { return Audit_1.Audit; })
    ], Variant.prototype, "audit", void 0);
    Variant = __decorate([
        typeorm_1.Entity({ name: 'Variant' })
    ], Variant);
    return Variant;
}(typeorm_1.BaseEntity));
exports.Variant = Variant;
