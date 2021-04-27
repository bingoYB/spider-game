// 房源信息抓取
import * as request from "superagent";
const superagentProxy =  require('superagent-proxy') ;

superagentProxy(request)

const spiderDomain = {
  spiderDomain: 'http://www.tmsf.com/newhouse/property_searchall.htm',
  spiderPriceDomain: 'https://cd.lianjia.com',
  serverPort: 8082,
};

const proxyPool = [
  'http://114.67.108.243:8081'
]


interface searchModel {
  searchkeywordL: String
  keyword: String
  sid: String             // 区域  33 所有  330184 余杭
  districtid: String
  areaid: String          // 区域ID 从页面上取
  dealprice: String
  propertystate: String  // tab页 2 在售  3 代售
  propertytype: String   // 商品房属性  1 住宅
  ordertype: String
  priceorder: String
  openorder: String
  view720data: String
  page: String
  bbs: String
  avanumorder: String
  comnumorder: String
}

export const getNewHouse = () => {
  return request.get('http://www.baidu.com')
    // @ts-ignore
    .proxy(proxyPool[0])
    // .set('Host','www.tmsf.com')
    .set('Connection', 'keep-alive')
    .set('Pragma','no-cache')
    .set('Upgrade-Insecure-Requests','1')
    .set('User-Agent','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36')
    .set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9')
    .set('Accept-Encoding','gzip, deflate')
    .set('Accept-Language','zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7')
    .set('Cache-Control','no-cache')
    .set('DNT','1')
    .set('Cookie', 'Hm_lvt_bbb8b9db5fbc7576fd868d7931c80ee1=1618975819; gr_user_id=1fbdb3e9-f68a-4fc9-ae15-c1090ee5a053; BSFIT_EXPIRATION=1619010025559; BSFIT_DEVICEID=U70NmRly_CIRrduBGhebZcGBvwiqY3TTLORziIRpPWGnQOcIT1zHOknkRIT8zRaDvFYXzGrFaX68VCf66ZeABaq_0c0lz9OI3D8XRXgp_DnBRcoSqIutdHmnS4kIbh9B-UrXCJzV_FUm8UX9o3wW9sTOizwBblqY; UM_distinctid=178f27aa54cf4-070526b730fa64-5771133-240000-178f27aa54dab; JSESSIONID=9FA13AC8FA63E40A5CBCE1A3E093FF44; BSFIT_o62th=; b61f24991053b634_gr_session_id=f52eade4-b9d2-457a-850e-3a565decdd03; CNZZDATA1253675216=865865150-1618975801-http%253A%252F%252Fwww.tmsf.com%252F%7C1618981203; b61f24991053b634_gr_session_id_f52eade4-b9d2-457a-850e-3a565decdd03=true; Hm_lpvt_bbb8b9db5fbc7576fd868d7931c80ee1=1618985867')

  }

