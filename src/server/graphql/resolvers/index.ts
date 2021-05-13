import { Lottery } from 'lottery';
import LotteryModel from '../../models/lotteryModel';
import { logger } from '../../utils/logger';
import { getData } from '../../utils/lotterySpider';
const resolvers = {
  Query: {
    async lottery (
      _parent:any,
      args:any
    ): Promise<Lottery.data[]> {
      let query = { ...args }
      // let data = await getData()
      logger.info('开始查找数据')
      const allData = await LotteryModel.find(query)
      logger.info('数据查找结束')
      return allData
    }
  },
};

export default resolvers;