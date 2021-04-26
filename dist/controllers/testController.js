"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_koa_utils_1 = require("inversify-koa-utils");
const ioc_1 = require("../ioc");
const logger_1 = require("../utils/logger");
// import {BaseContext} from 'koa'
let TestController = class TestController {
    constructor() { }
    /**
     * @api {Get} /get index
     */
    async index(ctx) {
        logger_1.logger.info('#######');
        ctx.body = {
            status: true,
            code: 200,
        };
    }
};
__decorate([
    inversify_koa_utils_1.httpGet('health/check'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "index", null);
TestController = __decorate([
    ioc_1.provideThrowalbe(inversify_koa_utils_1.TYPE.Controller, "TestController"),
    inversify_koa_utils_1.controller('/'),
    __metadata("design:paramtypes", [])
], TestController);
exports.default = TestController;
