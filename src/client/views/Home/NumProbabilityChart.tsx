import { Chart, Interval,Line } from 'bizcharts';
import { Lottery } from 'lottery';
import React from 'react'

const scale = {
  index: {
    type: 'linear',
    tickInterval: 1,
    alias: '数字',
  },
  nums: {
    min: 0,
    alias: '出现次数',
  },
}

interface Iprops {
  chartData: Lottery.numPro[]
}

const numProbabilityChart: React.FC<Iprops> = ({ chartData }) => {
  chartData.shift()
  const data = chartData.map((el, index) => ({ ...el, index:index+1 }))

  return <Chart
    padding="auto"
    autoFit
    height={350}
    data={data}
    scale={scale}
    interactions={['active-region']}
  >
    {/* <Interval position="index*probability" label="概率"/> */}
    <Line shape="smooth" position="index*nums" label="出现次数" />
  </Chart>
}

export default numProbabilityChart