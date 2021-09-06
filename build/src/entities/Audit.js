"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audit = void 0;
var typeorm_1 = require("typeorm");
var Audit = /** @class */ (function () {
    function Audit() {
    }
    __decorate([
        typeorm_1.Column("varchar", { length: 200 })
    ], Audit.prototype, "createdBy", void 0);
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Audit.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 200 })
    ], Audit.prototype, "modifiedBy", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Audit.prototype, "modifiedAt", void 0);
    return Audit;
}());
exports.Audit = Audit;
