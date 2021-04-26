import {
  controller, httpGet, httpPost,
  interfaces, TYPE
} from 'inversify-koa-utils'
import TAGS from '../constant/tags';
import { IRouterContext } from 'koa-router'
import { inject } from 'inversify';
import { provideThrowalbe } from '../ioc';
import { ILottery } from '../interface/ILottery';

@provideThrowalbe(TYPE.Controller, "LotteryController")
@controller('/lottery')
export default class LotteryController implements interfaces.Controller {
  lotteryService: ILottery

  constructor(@inject(TAGS.LotteryService) LotteryService: ILottery) {
    this.lotteryService = LotteryService
  }

  @httpPost('/init')
  private async init(ctx: IRouterContext): Promise<any> {
    await this.lotteryService.init()
    ctx.body = {
      code: 200,
      data: 'ok'
    }
  }
  @httpPost('/update')
  private async update(ctx: IRouterContext, next: Promise<unknown>): Promise<any> {
    await this.lotteryService.update()
    ctx.body = {
      code: 200,
      data: 'ok'
    }
  }

  @httpGet('/getMongoData')
  private async getMongoData(ctx: IRouterContext, next: Promise<unknown>): Promise<any> {
    const data = await this.lotteryService.getLottery()
    ctx.body = {
      code: 200,
      data
    }
  }

  @httpPost('/analyze')
  private async analyze(ctx: IRouterContext, next: Promise<unknown>): Promise<any> {
    const data = await this.lotteryService.getLottery()
    const analyze = this.lotteryService.analyze(data)
    ctx.body = {
      code: 200,
      data: analyze
    }
  }
}