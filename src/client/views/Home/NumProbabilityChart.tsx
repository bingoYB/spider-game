import { Chart, Interval } from 'bizcharts';
import { Lottery } from 'lottery';
import React from 'react'

const scale = {
  num: {
    type: 'linear',
    tickInterval: 1
  }
}

interface Iprops {
  chartData: Lottery.numPro[]
}

const numProbabilityChart: React.FC<Iprops> = ({ chartData }) => {
  chartData.shift()
  const data = chartData.map((el, index) => ({ ...el, index }))

  return <Chart
    padding={[16, 16]}
    autoFit
    height={500}
    data={data}
    scale={scale}
  >
    <Interval position="index*probability" />
  </Chart>
}

export default numProbabilityChart