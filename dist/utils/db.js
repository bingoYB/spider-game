"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let connectTimeOut;
const DbHelper = {
    // 失败重连次数
    connectTimes: 8,
    /**
     * 连接mongodb
     * @returns mongoose
     */
    connect() {
        DbHelper.mongooseConnect();
        const db = mongoose_1.default.connection;
        db.once('error', () => {
            // 失败重连
            console.error('连接 mongodb 失败。');
            connectTimeOut = setInterval(() => {
                if (DbHelper.connectTimes > 0) {
                    console.log(`正在重连 mongodb，剩余次数 ${DbHelper.connectTimes}。`);
                    DbHelper.connectTimes -= 1;
                    DbHelper.mongooseConnect();
                }
                else {
                    console.log('重连 mongodb 失败。');
                    clearTimeout(connectTimeOut);
                }
            }, 8000);
        });
        db.on('open', () => {
            console.log('连接 mongodb 成功。');
            clearTimeout(connectTimeOut);
        });
        // 单例模式
        DbHelper.connect = () => mongoose_1.default;
        return mongoose_1.default;
    },
    mongooseConnect() {
        mongoose_1.default.connect('mongodb://normal:88888888@localhost:27017/spider', {
            useNewUrlParser: true,
            // 弃用警告 https://mongoosejs.com/docs/deprecations.html#-findandmodify-
            useFindAndModify: false
        });
    }
};
exports.default = DbHelper;
