import fetch from 'node-fetch'
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost'
import { Lottery } from 'lottery';

const client = new ApolloClient<unknown>({
  uri: 'http://localhost:3000/graphql',
  // @ts-ignore
  fetch: fetch
});

const date = '12313123'

client.query<Lottery.data>({
  query: gql`
    query {
      lottery(date: "12313123") {
        uid
        frontNums
        backNums
        prizePool
      }
    }`
}).then((rs) => {
  console.log(rs)
}).catch(err=>{
})