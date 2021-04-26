import { getData } from "../../src/server/utils/lotterySpider";
import { expect } from 'chai'

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


describe('测试 lotterySpider 的爬虫功能', () => {
  it('爬虫功能',function(done) {
    getData().then((data)=>{
      console.log(data)
      expect(data.length).to.be.above(100)
      expect(data[0]).has.property('uid')
      expect(data[0]).has.property('frontNums')
      expect(data[0]).has.property('backNums')
      expect(data[0]).has.property('prizePool')
      expect(data[0]).has.property('firstPrice')
      expect(data[0]).has.property('secondPrice')
      expect(data[0]).has.property('secondPriceNum')
      expect(data[0]).has.property('totalBet')
      expect(data[0]).has.property('date')
      done()
    })
  })
})
