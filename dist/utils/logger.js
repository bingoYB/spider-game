"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const log4js_1 = require("log4js");
const isProd = process.env.NODE_ENV === 'production';
log4js_1.configure({
    appenders: {
        app: {
            category: 'app',
            type: isProd ? 'file' : 'console',
            filename: './logs/app',
            alwaysIncludePattern: true,
            pattern: "yyyy-MM-dd.log",
            maxLogSize: 100000,
            backups: 5,
        }
    },
    categories: {
        default: { appenders: ['app'], level: 'info' }
    },
    pm2: true,
    disableClustering: true
});
exports.logger = log4js_1.getLogger('app');
