/* eslint-disable no-underscore-dangle */
import { logger } from '../utils/logger';
import { FilterQuery } from 'mongoose';
import DbHelper from '../utils/db';
import { Lottery } from 'lottery';

const mongoose = DbHelper.connect();

// 创建数据库
const LotterySchema = new mongoose.Schema({
  uid: String,
  frontNums: [Number],
  backNums: [Number],
  prizePool: Number,
  firstPrice: Number,
  firstPriceNum: Number,
  secondPrice: Number,
  secondPriceNum: Number,
  totalBet: Number,
  date: Date
});
// 创建表
const LotteryCol = mongoose.model('Lottery', LotterySchema);

const LotteryModel = {
  /**
   * 新增一期彩票信息，若存在，则更新
   * @param {Lottery.data} item
   * @returns {(Promise<boolean | Lottery.data>)}
   */
  async add(item: Lottery.data): Promise<boolean | Lottery.data> {
    let result: boolean | Lottery.data = item;
    const findItem = await this.find({ uid: item.uid });
    if (findItem.length > 0) {
      // 无更新操作
      return false
    } else {
      const lottery = new LotteryCol(item);
      result = await new Promise(resolve => {
        lottery.save(err => {
          if (err) {
            logger.error(JSON.stringify(err));
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    }
    return result;
  },

  /**
   *
   * 批量插入房源信息
   * @param {Lottery.data[]} array
   * @returns {Promise<void>}
   */
  async addMany(array: Lottery.data[]): Promise<void> {
    const newArray: Lottery.data[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const item of array) {
      const findItem = await this.find({ uid: item.uid });
      if (findItem.length === 0) {
        newArray.push(item);
      }
    }

    logger.info('添加数据')
    logger.info(newArray)

    LotteryCol.create(
      newArray,
      (err: Error | null) => {
        if (err) {
          logger.error(JSON.stringify(err));
        }
      }
    );
  },

  /**
   *
   * 更新一个房源信息
   * @param {Lottery.data} item
   */
  findOneAndUpdate(item: Partial<Lottery.data>, query: FilterQuery<Lottery.data> = { uid: item.uid }): void {
    LotteryCol.findOneAndUpdate(
      query,
      item,
      (err: Error | null) => {
        if (err) {
          logger.error(JSON.stringify(err));
        }
      }
    );
  },

  update(query: FilterQuery<Lottery.data>, item: Partial<Lottery.data>): void {
    LotteryCol.updateOne(
      query,
      item,
      (err: Error | null) => {
        if (err) {
          logger.error(JSON.stringify(err));
        }
      }
    );
  },

  async deleteOne(query: FilterQuery<Lottery.data>): Promise<Boolean> {
    return new Promise((rs, rj) => {
      LotteryCol.deleteOne(query, (err: Error | null) => {
        if (err) {
          logger.error(JSON.stringify(err));
          rj(err)
        } else {
          rs(true)
        }
      })
    })
  },
  /**
   *
   * 查找
   * @param {object} [query]
   * @returns {Lottery.data[]}
   */
  async find(query: FilterQuery<Lottery.data>|undefined): Promise<Lottery.data[]> {
    return new Promise((rs, rj) => {
      LotteryCol.find((err: Error | null, res: Lottery.data[]) => {
        if (err) {
          logger.error(JSON.stringify(err));
          rj(err)
        } else {
          rs(res)
        }
      });
    })
  }
};

export default LotteryModel;
