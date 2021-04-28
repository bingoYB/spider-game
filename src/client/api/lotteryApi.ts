import { ApolloQueryResult, gql } from 'apollo-boost'
import { Lottery } from 'lottery';
import http, { gqlClient } from '../utils/request'

interface queryResultData {
  lottery: Lottery.data[]
}

export async function getLotteryList(): Promise<Lottery.data[]> {
  return gqlClient.query<queryResultData>({
    query: gql`
    query {
      lottery {
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
  }).then(rs=>rs.data.lottery)
}

export function getAnalyze(count:number|undefined):Promise<Lottery.analyze>{
  return http.get('/lottery/analyze',{params:{count}})
}