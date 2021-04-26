import { ApolloServer } from 'apollo-server-koa';
import * as Koa from 'koa';
import { readFileSync } from 'fs'
// eslint-disable-next-line import/no-extraneous-dependencies
import { join } from "path";
import resolvers from "./resolvers";
const isProd = process.env.NODE_ENV === 'production'

const typeDefs = readFileSync(join(__dirname, './typeDefs.graphql'),{encoding:'utf-8'})


function initGraphQL(app: Koa): void {
  const server = new ApolloServer({
    typeDefs, resolvers, 
    introspection: !isProd,
    playground: !isProd,
    // mocks: !isProd,
  });
  server.applyMiddleware({ app });
}

export default initGraphQL;
