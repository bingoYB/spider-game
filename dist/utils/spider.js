"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewHouse = void 0;
const request = __importStar(require("superagent"));
const superagentProxy = require('superagent-proxy');
superagentProxy(request);
const spiderDomain = {
    spiderDomain: 'http://www.tmsf.com/newhouse/property_searchall.htm',
    spiderPriceDomain: 'https://cd.lianjia.com',
    serverPort: 8082,
};
const proxyPool = [
    'http://114.67.108.243:8081'
];
const getNewHouse = () => {
    return request.get('http://www.baidu.com')
        // @ts-ignore
        .proxy(proxyPool[0])
        // .set('Host','www.tmsf.com')
        .set('Connection', 'keep-alive')
        .set('Pragma', 'no-cache')
        .set('Upgrade-Insecure-Requests', '1')
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36')
        .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9')
        .set('Accept-Encoding', 'gzip, deflate')
        .set('Accept-Language', 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7')
        .set('Cache-Control', 'no-cache')
        .set('DNT', '1')
        .set('Cookie', 'Hm_lvt_bbb8b9db5fbc7576fd868d7931c80ee1=1618975819; gr_user_id=1fbdb3e9-f68a-4fc9-ae15-c1090ee5a053; BSFIT_EXPIRATION=1619010025559; BSFIT_DEVICEID=U70NmRly_CIRrduBGhebZcGBvwiqY3TTLORziIRpPWGnQOcIT1zHOknkRIT8zRaDvFYXzGrFaX68VCf66ZeABaq_0c0lz9OI3D8XRXgp_DnBRcoSqIutdHmnS4kIbh9B-UrXCJzV_FUm8UX9o3wW9sTOizwBblqY; UM_distinctid=178f27aa54cf4-070526b730fa64-5771133-240000-178f27aa54dab; JSESSIONID=9FA13AC8FA63E40A5CBCE1A3E093FF44; BSFIT_o62th=; b61f24991053b634_gr_session_id=f52eade4-b9d2-457a-850e-3a565decdd03; CNZZDATA1253675216=865865150-1618975801-http%253A%252F%252Fwww.tmsf.com%252F%7C1618981203; b61f24991053b634_gr_session_id_f52eade4-b9d2-457a-850e-3a565decdd03=true; Hm_lpvt_bbb8b9db5fbc7576fd868d7931c80ee1=1618985867');
};
exports.getNewHouse = getNewHouse;
