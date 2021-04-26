import * as request from "superagent";

export  const get = (path:string)=>{
  return request.get(path)
    .set('Connection', 'keep-alive')
    .set('Pragma', 'no-cache')
    .set('Upgrade-Insecure-Requests', '1')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36')
    .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9')
    .set('Accept-Encoding', 'gzip, deflate')
    .set('Accept-Language', 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7')
    .set('Cache-Control', 'no-cache')
    .set('DNT', '1')
}