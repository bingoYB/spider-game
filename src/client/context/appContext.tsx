import { Lottery } from 'lottery'
import React from 'react'
const { createContext } = React

export interface IAppContext {
  lotteryData: {
    all: Lottery.data[],
    analyze: Lottery.analyze
  };
  changeLotteryData(data: Lottery.data[]): void;
  changeAnalyze(data: Lottery.analyze): void;
}

export const globalData: IAppContext = {
  lotteryData: {
    all: [],
    analyze: {
      frontFigure: [],
      backFigure: [],
      statistics: {
        // 总共期数
        total: 0,
        // 一等奖人数
        firstNum: 0,
        // 二等奖人数
        secondNum: 0,
        // 最新奖池总额
        latestPrice: 0,
        // 总奖池
        totalPrice: 0,
      }
    }
  },
  changeLotteryData() {},
  changeAnalyze() {}
}

export const AppContext = createContext<IAppContext>(globalData)

