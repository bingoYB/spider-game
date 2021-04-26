import { configure, getLogger, Logger } from 'log4js';

const isProd = process.env.NODE_ENV === 'production'

configure(
  {
    appenders: {
      app: {
        category: 'app',
        type: isProd ? 'file' : 'console',
        filename: './logs/app',
        alwaysIncludePattern: true,
        pattern: "yyyy-MM-dd.log",
        maxLogSize: 100000,
        backups: 5,
      }
    },
    categories: {
      default: { appenders: ['app'], level: 'info' }
    },
    pm2: true,
    disableClustering: true
  });


export const logger: Logger = getLogger('app');