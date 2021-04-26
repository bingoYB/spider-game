### inversify-koa-template

基于 [inversify](https://github.com/inversify/InversifyJS) 的一个模仿spring的IOC风格的koa后端node服务模板

旨在快速方便的搭建出一个面向切面编程（AOP）的 node web 应用模板，不过度封装，接近原生。

inversify的中文文档：http://www.febeacon.com/inversifyjs_docs_cn/routes/basic/

#### 开发目的

遵循 [SOLID](https://www.zhihu.com/question/65856050/answer/302261732) 原则的代码。

鼓励和促进开发者遵循最佳的 OOP 和 IoC 实践。

尽可能地减少运行时(runtime)开销。

提供一种[先进的开发体验](https://github.com/inversify/InversifyJS/blob/master/wiki/ecosystem.md)。



#### 项目下载安装模块

```shell
  git clone https://github.com/soraping/koa-ts.git
  cd koa-ts
  npm install
```



#### 运行与调试

```shell
# 本地运行
npm run start
# 编译
npm run build
```

##### 调试 DEBUG

点击vscode的运行与调试，点击开始调试，或者直接按F5



#### 开发

service 业务代码，负责主要业务逻辑

```typescript
import { provide } from "inversify-binding-decorators";
import TAGS from "../constant/tags";
import { IIndex } from "../interface/IIndex";
import { Model } from "../models/User";

@provide(TAGS.IndexService)
export class IndexService implements IIndex {
  private userStorage: Model.User[] = [{
    email: '1231@qq.com',
    name: '小明'
  }, {
    email: '2131231@qq.com',
    name: '小w'
  }];
  
  getUser(id: number) {
    let result: Model.User
    result = this.userStorage[id]
    return result
  }

  addUser(user:Model.User):void  {
    this.userStorage.push(user)
  }
}
```



controller  路由控制层

```typescript
import { controller, httpGet, httpPost, 
  interfaces, queryParam, requestBody, requestParam, response, TYPE } from 'inversify-koa-utils'
import TAGS from '../constant/tags';
import { IIndex } from '../interface/IIndex';
import { IRouterContext } from 'koa-router'
import { IndexService } from '../services/indexService';
import { inject } from 'inversify';
import { provideThrowalbe } from '../ioc';
import Koa from 'koa'
import { Model } from '../models/User';
// import {BaseContext} from 'koa'

@provideThrowalbe(TYPE.Controller,"IndexController")
@controller('/')
export default class IndexController implements interfaces.Controller {
  private indexService: IIndex
  constructor(@inject(TAGS.IndexService) indexService:IndexService) {
    this.indexService = indexService
  }
  @httpGet('/')
  private async index(@queryParam("id") id: number, @response() res: Koa.Response): Promise<any> {
    const data = this.indexService.getUser(id)
    res.ctx.body = {
      data
    }
  }
  @httpGet('test')
  private async test(ctx: IRouterContext, next: Promise<unknown>): Promise<any> {
    const data = this.indexService.getUser(1)
    ctx.body = {
      data
    }
  }
  @httpPost('add')
  private async add(@requestBody() user: Model.User,@response() res: Koa.Response) {
    try {
      await this.indexService.addUser(user)
      res.body = 200
    } catch (err) {
      res.status = 400
      res.body = { error: err.message }
    }
  }

  // restful 风格
  @httpGet('get/:id')
  private async getID(@requestParam('id') id: number, res: Koa.Response): Promise<any>{
    const data = this.indexService.getUser(id)
    res.body = {
      data
    }
  }
}
```



Model  涉及到的数据模型

```typescript
export namespace Model {
  export class User{
    email:string;
    name:string;
  }
}
```



loader 半自动加载，需要在loader里将Service与Controller手动import进来

```ts
import '../controllers/indexController'
import '../services/indexService'
```



#### 测试

使用mocha+chai+supertest进行接口测试与单元测试

```js
const {expect} = require('chai');
const request = require('supertest');

const host = "localhost:3000";

describe('user model test', function () {

  it('get user not empty', function (done) {
    request(host)
      .get('/get/1')
      .end(function (err, res) {
        const user = JSON.parse(res.text)
        expect(user.data).to.not.be.equal({})
        expect(user.data.name).to.be.equal('小w')
        // done(err) 这种用法写起来很鸡肋，是因为偷懒不想测 err 的值
        // 如果勤快点，这里应该写成
        /*
          should.not.exist(err);
          res.text.should.equal('55');
       */
        done(err);
      });
  });

  it('user add success', function(done){
      request(host)
          .post('/add')
          .type('json')
          .send({ name: 'zhangsan' })
          .send({ email: '123456' })
          .expect(200, done)
  })

});
```

