"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const tags_1 = __importDefault(require("../constant/tags"));
const lotteryModel_1 = __importDefault(require("../models/lotteryModel"));
const logger_1 = require("../utils/logger");
const lotterySpider_1 = require("../utils/lotterySpider");
let LotteryService = class LotteryService {
    /**
     * @param data
     * @returns
     */
    analyze(data) {
        const statistics = {
            // 总共期数
            total: data.length,
            // 一等奖人数
            firstNum: 0,
            // 二等奖人数
            secondNum: 0,
            // 最新奖池总额
            latestPrice: data[data.length - 1].prizePool,
            // 总奖池
            totalPrice: 0
        };
        const frontFigureNums = new Array(36).fill(0);
        const backFigureNums = new Array(13).fill(0);
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            // 奖池人数统计
            statistics.firstNum += item.firstPriceNum;
            statistics.secondNum += item.secondPriceNum;
            statistics.totalPrice += item.prizePool;
            for (let j = 0; j < item.frontNums.length; j++) {
                const num = item.frontNums[j];
                frontFigureNums[num] += 1;
            }
            for (let j = 0; j < item.backNums.length; j++) {
                const num = item.backNums[j];
                backFigureNums[num] += 1;
            }
        }
        const frontFigure = [];
        const backFigure = [];
        for (let i = 1; i < frontFigureNums.length; i++) {
            const times = frontFigureNums[i];
            if (times) {
                frontFigure[i] = { nums: times, probability: Math.round(times * 100 / data.length) };
            }
        }
        for (let i = 1; i < backFigureNums.length; i++) {
            const times = backFigureNums[i];
            if (times) {
                backFigure[i] = { nums: times, probability: Math.round(times * 100 / data.length) };
            }
        }
        return {
            frontFigure,
            backFigure,
            statistics
        };
    }
    async update() {
        let data = await lotterySpider_1.getData();
        await lotteryModel_1.default.addMany(data);
        logger_1.logger.info('数据更新成功');
    }
    getLottery() {
        return lotteryModel_1.default.find({});
    }
    async init() {
        let data = await lotterySpider_1.getData();
        await lotteryModel_1.default.addMany(data);
        logger_1.logger.info('数据初始化成功');
    }
};
LotteryService = __decorate([
    inversify_binding_decorators_1.provide(tags_1.default.LotteryService)
], LotteryService);
exports.default = LotteryService;
