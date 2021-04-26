"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
// 彩票爬虫
const request_1 = require("./request");
const cheerio_1 = require("cheerio");
const lotteryDataSource = {
    domain: 'http://datachart.500.com/dlt/history/newinc/history.php?start=00000&end=99044',
};
// 从网站获取数据
const getData = () => {
    return request_1.get(lotteryDataSource.domain).then(rs => {
        const $ = cheerio_1.load(rs.text);
        const data = [];
        const trlist = $('#tdata tr.t_tr1');
        for (let index = trlist.length - 1; index >= 0; index--) {
            const el = trlist[index];
            const children = $(el).find('td');
            const uid = $(children[0]).text();
            const frontNums = [];
            for (let i = 1; i < 6; i++) {
                frontNums.push(Number($(children[i]).text()));
            }
            const backNums = [];
            for (let i = 6; i < 8; i++) {
                backNums.push(Number($(children[i]).text()));
            }
            const prizePool = Number($(children[8]).text().split(',').join(''));
            const firstPriceNum = Number($(children[9]).text());
            const firstPrice = Number($(children[10]).text().split(',').join(''));
            const secondPriceNum = Number($(children[11]).text());
            const secondPrice = Number($(children[12]).text().split(',').join(''));
            const totalBet = Number($(children[13]).text().split(',').join(''));
            const date = $(children[14]).text();
            let lotterData = {
                uid, frontNums, backNums, prizePool, firstPrice, firstPriceNum, secondPrice, secondPriceNum, totalBet, date
            };
            data.push(lotterData);
        }
        return data;
    });
};
exports.getData = getData;
