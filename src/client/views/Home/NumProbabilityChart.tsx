import { Chart, Interval,Line } from 'bizcharts';
import { Progress,Row,Col } from 'antd'
import { Lottery } from 'lottery';
import React from 'react'
import {Ball} from './LoteryTable'

const scale = {
  index: {
    type: 'linear',
    tickInterval: 1,
    alias: '数字',
  },
  nums: {
    min: 150,
    alias: '出现次数',
  },
}

interface Iprops {
  chartData: Lottery.numPro[]
}

const numProbabilityChart: React.FC<Iprops> = ({ chartData }) => {
  chartData.shift()
  const data = chartData.map((el, index) => ({ ...el, index:index+1 }))

  return <div>
    <Chart
      padding="auto"
      autoFit
      height={200}
      data={data}
      scale={scale}
      interactions={['active-region']}
    >
      {/* <Interval position="index*probability" label="概率"/> */}
      <Line shape="smooth" position="index*nums" label="出现次数" />
    </Chart>
      <Row gutter={8}>
        <Col span={6} style={{display: 'flex'}}>
          <div>
            <div>数字 11</div>
            <div>数字 11</div>
            <div>30%</div>
          </div>
          <Progress type="circle" strokeWidth={20} percent={30} width={45} showInfo={false} />
        </Col>
      <Col span={4}>
        <div>
          <div>数字 11</div>
          <div>30%</div>
        </div>
        <Progress type="circle" strokeWidth={16} percent={30} width={50} showInfo={false} />
      </Col>
      <Col span={4}>
        <div>
          <div>数字 11</div>
          <div>30%</div>
        </div>
        <Progress type="circle" strokeWidth={16} percent={30} width={50} showInfo={false} />
      </Col>
      </Row>
  </div> 
}

export default numProbabilityChart