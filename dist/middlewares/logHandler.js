"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogger = void 0;
const logger_1 = require("../utils/logger");
const handleLogger = async (ctx, next) => {
    try {
        // 入口信息保存
        let logContent = {
            method: ctx.method,
            url: ctx.url,
            headers: ctx.headers,
            ip: ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips
        };
        logger_1.logger.info(JSON.stringify(logContent));
        await next();
    }
    catch (err) {
        logger_1.logger.error(err);
        ctx.status = err.status || 500;
        ctx.body = '500请求啦~恢复中.';
    }
};
exports.handleLogger = handleLogger;
