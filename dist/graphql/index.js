"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
const fs_1 = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const path_1 = require("path");
const resolvers_1 = __importDefault(require("./resolvers"));
const isProd = process.env.NODE_ENV === 'production';
const typeDefs = fs_1.readFileSync(path_1.join(__dirname, './typeDefs.graphql'), { encoding: 'utf-8' });
function initGraphQL(app) {
    const server = new apollo_server_koa_1.ApolloServer({
        typeDefs, resolvers: resolvers_1.default,
        introspection: !isProd,
        playground: !isProd,
        // mocks: !isProd,
    });
    server.applyMiddleware({ app });
}
exports.default = initGraphQL;
