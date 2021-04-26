"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lotteryModel_1 = __importDefault(require("../../models/lotteryModel"));
const resolvers = {
    Query: {
        async lottery(_parent, args) {
            let query = Object.assign({}, args);
            const allData = await lotteryModel_1.default.find(query);
            return allData;
        }
    },
};
exports.default = resolvers;
