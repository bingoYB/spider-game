# spider-game

<p>
<img src="https://img.shields.io/badge/build-passing-green.svg">
</p>

> 爬虫数据分析；
>
> 将爬虫分析作为游戏

统计一些有意思的数据，通过图表的形式展示出来。

## Preview

![示例图片](https://github.com/bingoYB/spider-game/blob/main/example.png)



## Features

已实现的功能：

- [x] 大乐透彩票数据基础分析
- [x] 大乐透彩票数据保持更新。
- [x] 后端爬虫架构搭建

## Technology

主要用到的技术：

- React：MVVM 框架，用于构建前端界面。
- Ant Design：基于 React 的组件库。
- Bizchats：基于 React 的图表库。
- Post-CSS：CSS 处理器，提供变量、计算、嵌套、Mixin、函数等。
- Webpack：打包前端项目，生成静态文件。
- Apollo：基于 GraphQL 封装，用于搭建后端 GraphQL 支持和前端数据请求。
- Koa：后端 Web 层框架，用于接收请求，进行处理。
- Cheerio：解析抓取的 HTML 数据。
- Mongoose：为 MongoDB 定义数据模型。
- Gulp：打包后端项目，编译 TS 语法。
- Mocha+chai：测试前后端项目，单元测试，API 测试等。
- Typescript：为 JS 提供良好的类型检查功能，能编译出高质量的 JS 代码。
- inversify：提供IOC风格的koa后端node服务框架

项目没有使用脚手架工具搭建，基于模板[inversify-koa-template](https://github.com/bingoYB/inversify-koa-template)，然后集成其他组件，一步一步配置而成。具体的搭建流程：[项目选型与环境搭建](https://github.com/bingoYB/spider-game/blob/main/选型与搭建.md)。

## Start

```shell
# clone with Git Bash
git clone https://github.com/bingoYB/spider-game.git

# change directory
cd spider-game

# install dependencies
npm i

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```


