import { provide } from "inversify-binding-decorators";
import { Lottery } from "lottery";
import TAGS from "../constant/tags";
import { ILottery } from "../interface/ILottery";
import LotteryModel from "../models/lotteryModel";
import { logger } from "../utils/logger";
import { getData } from '../utils/lotterySpider'

@provide(TAGS.LotteryService)
export default class LotteryService implements ILottery{
  /**
   * @param data 
   * @returns 
   */
  analyze(data: Lottery.data[]): Lottery.analyze {
    const statistics = {
      // 总共期数
      total: data.length,
      // 一等奖人数
      firstNum: 0,
      // 二等奖人数
      secondNum: 0,
      // 最新奖池总额
      latestPrice: data[data.length - 1].prizePool,
      // 总奖池
      totalPrice: 0
    }

    const frontFigureNums: number[] = new Array(36).fill(0)

    const backFigureNums: number[] = new Array(13).fill(0)

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      // 奖池人数统计
      statistics.firstNum += item.firstPriceNum
      statistics.secondNum += item.secondPriceNum
      statistics.totalPrice += item.prizePool

      for (let j = 0; j < item.frontNums.length; j++) {
        const num = item.frontNums[j];
        frontFigureNums[num] += 1
      }

      for (let j = 0; j < item.backNums.length; j++) {
        const num = item.backNums[j];
        backFigureNums[num] += 1
      }
    }

    const frontFigure = []
    const backFigure = []

    for (let i = 1; i < frontFigureNums.length; i++) {
      const times = frontFigureNums[i];
      if (times) {
        frontFigure[i] = { nums: times, probability: Math.round(times * 100 / data.length) }
      }
    }

    for (let i = 1; i < backFigureNums.length; i++) {
      const times = backFigureNums[i];
      if (times) {
        backFigure[i] = { nums: times, probability: Math.round(times * 100 / data.length) }
      }
    }

    return {
      frontFigure,
      backFigure,
      statistics
    }
  }

  async update(): Promise<any> {
    let data = await getData()
    await LotteryModel.addMany(data)
    logger.info('数据更新成功')
  }

  getLottery(){
    return LotteryModel.find({})
  }

  async init(): Promise<any>{
    let data = await getData()
    await LotteryModel.addMany(data)
    logger.info('数据初始化成功')
  }
}