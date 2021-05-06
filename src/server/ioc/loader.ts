// import '../controllers/testController'
// import '../controllers/lotteryController'
// import '../services/lotteryService'

import requireDir from 'require-directory'
import {resolve} from 'path'
import {logger} from '../utils/logger'

const requireOption = {
  extensions:['ts','js']
}

const controllerMod = requireDir(module, resolve(__dirname, '../controllers'), requireOption)
const serverrMod = requireDir(module, resolve(__dirname, '../services'), requireOption)

logger.info('自动加载模块(auto load modules):')
logger.info('Controllers',controllerMod)
logger.info('Services',serverrMod)