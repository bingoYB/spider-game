import {
  controller, httpGet,
  interfaces, TYPE
} from 'inversify-koa-utils'
import { IRouterContext } from 'koa-router'
import { provideThrowalbe } from '../ioc';
import { logger } from '../utils/logger';
// import {BaseContext} from 'koa'

@provideThrowalbe(TYPE.Controller, "TestController")
@controller('/')
export default class TestController implements interfaces.Controller {
  constructor() { }
  /**
   * @api {Get} /get index
   */
  @httpGet('health/check')
  private async index(ctx: IRouterContext): Promise<any> {
    logger.info('health-check ok')
    ctx.body = {
      status: true,
      code: 200,
    }
  }

  @httpGet('mock/anlyze')
  private async anlyze(ctx: IRouterContext): Promise<any> {
    const res = require('../mock/analyze.json')
    ctx.body = res
  }
}