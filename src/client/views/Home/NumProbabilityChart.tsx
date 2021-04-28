import { Chart, Interval, Line } from 'bizcharts';
import { Progress } from 'antd'
import { Lottery } from 'lottery';
import React from 'react'
import _ from 'lodash';
import Flex from '../../components/Layout/Flex';
import {AppContext} from '../../context/appContext'

const { useContext } = React

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
  type: string
}

interface IDealData {
  nums: number
  probability: number
  index: number
}

const numProbabilityChart: React.FC<Iprops> = ({ type }) => {

  const appState = useContext(AppContext)

  const { frontFigure, backFigure,sourceData } = appState.lotteryData.analyze

  let chartData: Lottery.numPro[]

  if (type === 'front') chartData = frontFigure

  else chartData = backFigure

  chartData.shift()

  console.log(chartData)

  return <div>
    <Chart
      padding="auto"
      autoFit
      height={200}
      data={chartData}
      scale={scale}
      interactions={['active-region']}
    >
      {/* <Interval position="index*probability" label="概率"/> */}
      <Line shape="smooth" position="index*nums" label="出现次数" />
    </Chart>
    {/* @ts-ignore */}
    <NumProbabilityAnalyze chartData={chartData} />
  </div>
}

export default numProbabilityChart


interface INumsProp extends Lottery.numPro {
  chartData: IDealData[]
}

const NumProbabilityAnalyze: React.FC<INumsProp> = ({ chartData }) => {
  const data = _.compact(chartData)
  data.sort((a, b) => {
    return b.probability - a.probability
  })

  return <div style={{ padding: '32px 8px' }}>
    <div>数字概率排行：</div>
    <div style={{
      overflow: 'auto', width: '100%'
    }}>
      <Flex>
        {
          data.map((el, index) => <div key={index} style={{ display: 'flex', padding: '16px 0' }}>
            <div style={{ padding: '0 24px', width: '120px' }}>
              <div className="attr-label">数字：<span>{el.index}</span></div>
              <div className="attr-label">概率：<span>{el.probability}%</span></div>
            </div>
            <Progress type="circle" strokeWidth={20} percent={el.probability} width={45} showInfo={false} />
          </div>
          )
        }
      </Flex>
    </div >
  </div>
}