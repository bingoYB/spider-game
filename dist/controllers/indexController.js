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
const indexService_1 = require("../services/indexService");
const inversify_1 = require("inversify");
const ioc_1 = require("../ioc");
const koa_1 = __importDefault(require("koa"));
const User_1 = require("../models/User");
// import {BaseContext} from 'koa'
let IndexController = class IndexController {
    constructor(indexService) {
        this.indexService = indexService;
    }
    /**
     * @api {Get} /get index
     * @apiGroup User
     * @apiParam {number} id 索引ID
     * @apiParamExample {number} id
     * id = 1
     *
     * @apiSuccessExample  {json} Response-Example
     * {
     *   "name": "小王",
     *   "email": "test@111"
     * }
     */
    async index(id, res) {
        const data = this.indexService.getUser(id);
        res.ctx.body = {
            data
        };
    }
    async test(ctx, next) {
        const data = this.indexService.getUser(1);
        ctx.body = {
            data
        };
    }
    /**
    * @api {Post} /add add
    * @apiGroup User
    * @apiParam {String} name 名称
    * @apiParam {String} email 邮箱
    * @apiParamExample {json} User
    * {
    *    "name":'123',
    *    'email':'123@qweq.com'
    * }
    */
    async add(user, res) {
        try {
            await this.indexService.addUser(user);
            res.body = 200;
        }
        catch (err) {
            res.status = 400;
            res.body = { error: err.message };
        }
    }
    // restful 风格
    async getID(id, res) {
        const data = this.indexService.getUser(id);
        res.body = {
            data
        };
    }
};
__decorate([
    inversify_koa_utils_1.httpGet('/'),
    __param(0, inversify_koa_utils_1.queryParam("id")), __param(1, inversify_koa_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], IndexController.prototype, "index", null);
__decorate([
    inversify_koa_utils_1.httpGet('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Promise]),
    __metadata("design:returntype", Promise)
], IndexController.prototype, "test", null);
__decorate([
    inversify_koa_utils_1.httpPost('add'),
    __param(0, inversify_koa_utils_1.requestBody()), __param(1, inversify_koa_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.Model.User, Object]),
    __metadata("design:returntype", Promise)
], IndexController.prototype, "add", null);
__decorate([
    inversify_koa_utils_1.httpGet('get/:id'),
    __param(0, inversify_koa_utils_1.requestParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], IndexController.prototype, "getID", null);
IndexController = __decorate([
    ioc_1.provideThrowalbe(inversify_koa_utils_1.TYPE.Controller, "IndexController"),
    inversify_koa_utils_1.controller('/'),
    __param(0, inversify_1.inject(tags_1.default.IndexService)),
    __metadata("design:paramtypes", [indexService_1.IndexService])
], IndexController);
exports.default = IndexController;
