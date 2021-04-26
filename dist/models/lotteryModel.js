"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
const logger_1 = require("../utils/logger");
const db_1 = __importDefault(require("../utils/db"));
const mongoose = db_1.default.connect();
// 创建数据库
const LotterySchema = new mongoose.Schema({
    uid: String,
    frontNums: [Number],
    backNums: [Number],
    prizePool: Number,
    firstPrice: Number,
    firstPriceNum: Number,
    secondPrice: Number,
    secondPriceNum: Number,
    totalBet: Number,
    date: Date
});
// 创建表
const LotteryCol = mongoose.model('Lottery', LotterySchema);
const LotteryModel = {
    /**
     * 新增一期彩票信息，若存在，则更新
     * @param {Lottery.data} item
     * @returns {(Promise<boolean | Lottery.data>)}
     */
    async add(item) {
        let result = item;
        const findItem = await this.find({ uid: item.uid });
        if (findItem.length > 0) {
            // 无更新操作
            return false;
        }
        else {
            const lottery = new LotteryCol(item);
            result = await new Promise(resolve => {
                lottery.save(err => {
                    if (err) {
                        logger_1.logger.error(JSON.stringify(err));
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        }
        return result;
    },
    /**
     *
     * 批量插入房源信息
     * @param {Lottery.data[]} array
     * @returns {Promise<void>}
     */
    async addMany(array) {
        var e_1, _a;
        const newArray = [];
        try {
            // eslint-disable-next-line no-restricted-syntax
            for (var array_1 = __asyncValues(array), array_1_1; array_1_1 = await array_1.next(), !array_1_1.done;) {
                const item = array_1_1.value;
                const findItem = await this.find({ uid: item.uid });
                if (findItem.length === 0) {
                    newArray.push(item);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (array_1_1 && !array_1_1.done && (_a = array_1.return)) await _a.call(array_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        logger_1.logger.info('添加数据');
        logger_1.logger.info(newArray);
        LotteryCol.create(newArray, (err) => {
            if (err) {
                logger_1.logger.error(JSON.stringify(err));
            }
        });
    },
    /**
     *
     * 更新一个房源信息
     * @param {Lottery.data} item
     */
    findOneAndUpdate(item, query = { uid: item.uid }) {
        LotteryCol.findOneAndUpdate(query, item, (err) => {
            if (err) {
                logger_1.logger.error(JSON.stringify(err));
            }
        });
    },
    update(query, item) {
        LotteryCol.updateOne(query, item, (err) => {
            if (err) {
                logger_1.logger.error(JSON.stringify(err));
            }
        });
    },
    async deleteOne(query) {
        return new Promise((rs, rj) => {
            LotteryCol.deleteOne(query, (err) => {
                if (err) {
                    logger_1.logger.error(JSON.stringify(err));
                    rj(err);
                }
                else {
                    rs(true);
                }
            });
        });
    },
    /**
     *
     * 查找
     * @param {object} [query]
     * @returns {Lottery.data[]}
     */
    async find(query) {
        return new Promise((rs, rj) => {
            LotteryCol.find(query, (err, res) => {
                if (err) {
                    logger_1.logger.error(JSON.stringify(err));
                    rj(err);
                }
                else {
                    rs(res);
                }
            });
        });
    }
};
exports.default = LotteryModel;
