import React from "react";
import CountUp from 'react-countup'
import Flex from '../../components/Layout/Flex'
import { Card, Col, Row, Space } from 'antd';
import LoteryTable from './LoteryTable'
import NumProbabilityChart from './NumProbabilityChart'
import Loading from '../../components/Loading/Loading'
import { getAnalyze, getLotteryList } from '../../api/lotteryApi'
import { AppContext } from '../../context/appContext';

import "./index.css"

const { useContext, useState } = React


const Home: React.FunctionComponent = () => {

  const appState = useContext(AppContext)

  const { statistics, frontFigure, backFigure } = appState.lotteryData.analyze
  const tableList = appState.lotteryData.all

  const [loading, setLoadState] = useState(false)

  if (frontFigure.length === 0) {
    Promise.all([getAnalyze(), getLotteryList()]).then(arr => {
      console.log(arr[0])
      appState.changeAnalyze(arr[0])
      appState.changeLotteryData(arr[1])
      setLoadState(true)
    })
  }

  return <div>
    {loading ?
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <Card title="总共期数">
              <CountUp end={statistics.total} className="count"></CountUp>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="一等奖总人数">
              <CountUp end={statistics.firstNum} className="count"></CountUp>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="二等奖总人数">
              <CountUp end={statistics.secondNum} className="count"></CountUp>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="最新奖金奖池">
              <CountUp end={statistics.latestPrice} className="count"></CountUp>
            </Card>
          </Col>
        </Row>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col span={16}>
              <Card title="前驱数字概率区间" >
                <NumProbabilityChart chartData={frontFigure} />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="后驱数字概率区间">
                <NumProbabilityChart chartData={backFigure} />
              </Card>
            </Col>
          </Row>
          <LoteryTable tableData={tableList}></LoteryTable>
        </Space>
      </div>
      : <Flex><Loading></Loading></Flex>}
  </div>
}

export default Home