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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_koa_utils_1 = require("inversify-koa-utils");
const tags_1 = __importDefault(require("../constant/tags"));
const inversify_1 = require("inversify");
const ioc_1 = require("../ioc");
let LotteryController = class LotteryController {
    constructor(LotteryService) {
        this.lotteryService = LotteryService;
    }
    async init(ctx) {
        await this.lotteryService.init();
        ctx.body = {
            code: 200,
            data: 'ok'
        };
    }
    async update(ctx, next) {
        await this.lotteryService.update();
        ctx.body = {
            code: 200,
            data: 'ok'
        };
    }
    async getMongoData(ctx, next) {
        const data = await this.lotteryService.getLottery();
        ctx.body = {
            code: 200,
            data
        };
    }
    async analyze(ctx, next) {
        const data = await this.lotteryService.getLottery();
        const analyze = this.lotteryService.analyze(data);
        ctx.body = {
            code: 200,
            data: analyze
        };
    }
};
__decorate([
    inversify_koa_utils_1.httpPost('/init'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LotteryController.prototype, "init", null);
__decorate([
    inversify_koa_utils_1.httpPost('/update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Promise]),
    __metadata("design:returntype", Promise)
], LotteryController.prototype, "update", null);
__decorate([
    inversify_koa_utils_1.httpGet('/getMongoData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Promise]),
    __metadata("design:returntype", Promise)
], LotteryController.prototype, "getMongoData", null);
__decorate([
    inversify_koa_utils_1.httpPost('/analyze'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Promise]),
    __metadata("design:returntype", Promise)
], LotteryController.prototype, "analyze", null);
LotteryController = __decorate([
    ioc_1.provideThrowalbe(inversify_koa_utils_1.TYPE.Controller, "LotteryController"),
    inversify_koa_utils_1.controller('/lottery'),
    __param(0, inversify_1.inject(tags_1.default.LotteryService)),
    __metadata("design:paramtypes", [Object])
], LotteryController);
exports.default = LotteryController;
