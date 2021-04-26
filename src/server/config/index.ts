import { extend } from 'lodash';
import { join } from 'path';

let config = {
  viewDir: join(__dirname, '..', 'views'),
  staticDir: join(__dirname, '..', 'assets'),
};

if (process.env.NODE_ENV === 'development') {
  let localConfig = {
    port: 8080,
    memoryFlag: false,
    proxyHost: 'http://127.0.0.1:8081/'
  };
  config = extend(config, localConfig);
}
if (process.env.NODE_ENV === 'production') {
  let prodConfig = {
    port: 80,
    memoryFlag: 'memory',
    proxyHost: 'http://127.0.0.1:8082/'
  };
  config = extend(config, prodConfig);
}

export default config;
