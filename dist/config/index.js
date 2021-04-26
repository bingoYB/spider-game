"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const path_1 = require("path");
let config = {
    viewDir: path_1.join(__dirname, '..', 'views'),
    staticDir: path_1.join(__dirname, '..', 'assets'),
};
if (process.env.NODE_ENV === 'development') {
    let localConfig = {
        port: 8080,
        memoryFlag: false,
        proxyHost: 'http://127.0.0.1:8081/'
    };
    config = lodash_1.extend(config, localConfig);
}
if (process.env.NODE_ENV === 'production') {
    let prodConfig = {
        port: 80,
        memoryFlag: 'memory',
        proxyHost: 'http://127.0.0.1:8082/'
    };
    config = lodash_1.extend(config, prodConfig);
}
exports.default = config;
