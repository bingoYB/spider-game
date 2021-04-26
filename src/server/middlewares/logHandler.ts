import Koa from 'koa'
import {logger} from '../utils/logger'



export const handleLogger = async (ctx: Koa.Context, next: any) => {
  try {
    // 入口信息保存
    let logContent = {
      method: ctx.method,
      url: ctx.url,
      headers: ctx.headers,
      ip: ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips
    }
    logger.info(JSON.stringify(logContent))
    await next();
  } catch (err) {
    logger.error(err);
    ctx.status = err.status || 500;
    ctx.body = '500请求啦~恢复中.';
  }
};
