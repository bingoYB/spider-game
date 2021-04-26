import { ApolloQueryResult, gql } from 'apollo-boost'
import { Lottery } from 'lottery';
import http, { gqlClient } from '../utils/request'

export async function getLotteryList(dateArr: string): Promise<ApolloQueryResult<Lottery.data>> {
  return gqlClient.query<Lottery.data>({
    query: gql`
    query {
      lottery(date: ${dateArr}) {
        uid
        frontNums
        backNums
        prizePool
        firstPrice
        firstPriceNum
        secondPrice
        secondPriceNum
        totalBet
        date
      }
    }`
  })
}

export function getAnalyze():Promise<Lottery.analyze>{
  return http.post('/lottery/analyze')
}