import { Chart, Interval, Line } from 'bizcharts';
import { Lottery } from 'lottery';
import React from 'react'

const scale = {
  date: {
    type: 'timeCat',
    alias: '时间',
  },
  firstPrice: {
    alias: '一等奖奖金(元)',
  },
  secondPrice: {
    alias: '二等奖奖金(元)',
  },
  totalBet: {
    alias: '总投注额(元)',
  },
  prizePool: {
    alias: '奖金奖池(元)',
  },
}

interface Iprops {
  chartData: Lottery.data[],
  fields:string
}

const priceChart: React.FC<Iprops> = ({ chartData,fields }) => {

  return <Chart
    padding="auto"
    autoFit
    height={350}
    data={chartData}
    scale={scale}
  >
    {/* <Interval position="index*probability" label="概率"/> */}
    {/* <Line shape="smooth" position="date*firstPrice"  /> */}
    <Line shape="smooth" position={`date*${fields}`} />
  </Chart>
}

export default priceChart