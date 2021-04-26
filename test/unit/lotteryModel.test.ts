import { expect } from 'chai'
import { Lottery } from 'lottery'
import LotteryModel from '../../src/server/models/lotteryModel'

const testData = {
  uid: '0001',
  frontNums: [1, 2, 3, 4, 5, 6],
  backNums: [11, 12],
  prizePool: 123123123124,
  firstPrice: 1412312312,
  firstPriceNum: 1,
  secondPrice: 21312312,
  secondPriceNum: 23,
  totalBet: 231431241234,
  date: "2018-04-03"
}

async function  testAdd() {
  await LotteryModel.add(testData)
  const findrs = await LotteryModel.find({ uid: '0001' })
  expect(findrs.length).above(0)
  return findrs
}

async function  testDel() {
  const result = await LotteryModel.deleteOne({ uid: '0001' })
  expect(result).to.be.equal(true)
  let findrs: Lottery.data[] = await LotteryModel.find({ uid: '0001' })
  expect(findrs.length).to.be.equal(0)
}

describe('测试 LotteryModel 的增删改查功能', () => {
  it('新增与查询', function (done) {
    this.timeout(10000)
    testAdd().then(rs=>done()).catch(err=>done(err))
  })

  it('删除查询', function (done) {
    this.timeout(10000)
    testDel().then(rs => done()).catch(err => done(err))
  })
})
