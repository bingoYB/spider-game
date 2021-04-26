"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const inversify_koa_utils_1 = require("inversify-koa-utils");
require("reflect-metadata");
require("./ioc/loader");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const logHandler_1 = require("./middlewares/logHandler");
const logger_1 = require("./utils/logger");
const graphql_1 = __importDefault(require("./graphql"));
const koa_static_1 = __importDefault(require("koa-static"));
// koa - bodyparser没有处理文件上传的功能，而koa - better - body处理了文件上传功能
// koa - bodyparserh会将请求体挂载在ctx.request.body，而koa - better - body将请求体挂载在ctx.request.fields
const container = new inversify_1.Container();
container.load(inversify_binding_decorators_1.buildProviderModule());
let server = new inversify_koa_utils_1.InversifyKoaServer(container);
server.setConfig((app) => {
    // add body parser
    app.use(koa_bodyparser_1.default());
    app.use(logHandler_1.handleLogger);
    // 静态资源目录
    app.use(koa_static_1.default(__dirname + '/client'));
    // 初始化 graphql
    graphql_1.default(app);
});
let app = server.build();
app.listen(3000, () => {
    logger_1.logger.info('InversifyKoaServer 启动成功！');
});
