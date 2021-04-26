
export declare namespace Lottery{
  interface data {
    uid: string
    frontNums: number[]
    backNums: number[]
    // 奖池奖金
    prizePool: number
    // 一等奖
    firstPrice: number
    firstPriceNum: number
    secondPrice: number
    secondPriceNum: number
    // 总投注额(元)
    totalBet: number
    // 开奖日期
    date: string
  }

  interface statistics{
    // 总共期数
    total: number
    // 一等奖人数
    firstNum: number
    // 二等奖人数
    secondNum: number
    // 最新奖池总额
    latestPrice: number
      // 总奖池
    totalPrice: number
  }

  interface analyze{
    frontFigure:numPro[]
    backFigure:numPro[]
    statistics:statistics
  }

  interface numPro{
    nums: number
    probability: number
  }
}