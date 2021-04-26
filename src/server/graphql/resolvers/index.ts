import { Lottery } from 'lottery';
import LotteryModel from '../../models/lotteryModel';
const resolvers = {
  Query: {
    async lottery (
      _parent:any,
      args:any
    ): Promise<Lottery.data[]> {
      let query = { ...args }
      const allData = await LotteryModel.find(query)
      return allData
    }
  },
};

export default resolvers;