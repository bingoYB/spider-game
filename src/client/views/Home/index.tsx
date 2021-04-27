import React from "react";
import CountUp from 'react-countup'
import Flex from '../../components/Layout/Flex'
import { Card, Col, Row, Space } from 'antd';
import LoteryTable from './LoteryTable'
import NumProbabilityChart from './NumProbabilityChart'
import PriceChart from './PriceChart'
import Loading from '../../components/Loading/Loading'
import { getAnalyze, getLotteryList } from '../../api/lotteryApi'
import { AppContext } from '../../context/appContext';

import "./index.css"
import { Lottery } from "lottery";

const { useContext, useState, useEffect } = React


const Home: React.FunctionComponent = () => {

  const appState = useContext(AppContext)

  const { statistics, frontFigure, backFigure } = appState.lotteryData.analyze
  const lotteryList = appState.lotteryData.all

  const [loading, setLoadState] = useState(true)

  useEffect(() => {
    Promise.all([getAnalyze(), getLotteryList()]).then(arr => {
      console.log(arr[0])
      appState.changeAnalyze(arr[0])
      const lotteryList: Lottery.data[] = arr[1].map(el => ({
        ...el,
        firstPrice: Number(el.firstPrice),
        secondPrice: Number(el.secondPrice),
        prizePool: Number(el.prizePool),
        totalBet: Number(el.totalBet),
        // 目前支持 2 种类型的时间（time) 类型：
        // 时间戳的数字形式，1436237115500 // new Date().getTime()
        // 时间字符串： '2015-03-01', '2015-03-01 12:01:40', '2015/01/05', '2015-03-01T16:00:00.000Z'
        date: Number(el.date)
      }))

      console.log(lotteryList)

      appState.changeLotteryData(lotteryList)
      setLoadState(false)
    })
  }, [])

  return <div>
    <Row gutter={16}>
      <Col span={6}>
        <Card title="总共期数">
          {loading ? <Loading></Loading> :
            <Flex>
              <svg className="card-icon" aria-hidden="true">
                <use xlinkHref="#icon-shuliang2"></use>
              </svg>
              <CountUp end={statistics.total} className="count"></CountUp>
            </Flex>}
        </Card>
      </Col>
      <Col span={6}>
        <Card title="一等奖总人数">
          {loading ? <Loading></Loading> :
            <Flex>
              <svg className="card-icon" aria-hidden="true">
                <use xlinkHref="#icon-yidengjiang2"></use>
              </svg>
              <CountUp end={statistics.firstNum} className="count"></CountUp>
            </Flex>}
        </Card>
      </Col>
      <Col span={6}>
        <Card title="二等奖总人数">
          {loading ? <Loading></Loading> :
           <Flex>
              <svg className="card-icon" aria-hidden="true">
                <use xlinkHref="#icon-erdengjiang1"></use>
              </svg>
              <CountUp end={statistics.secondNum} className="count"></CountUp>
            </Flex>}
        </Card>
      </Col>
      <Col span={6}>
        <Card title="最新奖金奖池">
          {loading ? <Loading></Loading> :
            <Flex>
              <svg className="card-icon" aria-hidden="true">
                <use xlinkHref="#icon-bonus"></use>
              </svg>
              <CountUp end={statistics.latestPrice} className="count"></CountUp>
            </Flex>
          }
        </Card>
      </Col>
    </Row>
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="前驱数字概率区间" >
            {loading ? <Loading></Loading> :
              <NumProbabilityChart chartData={frontFigure} />}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="后驱数字概率区间">
            {loading ? <Loading></Loading> :
              <NumProbabilityChart chartData={backFigure} />}
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="总奖池" >
            {loading ? <Loading></Loading> :
              <PriceChart chartData={lotteryList} fields="prizePool" />}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="总投注额" >
            {loading ? <Loading></Loading> :
              <PriceChart chartData={lotteryList} fields="totalBet" />}
          </Card>
        </Col>
      </Row>
      {/* <Row gutter={16}>
        <Col span={6}>
          <Card title="奖金与买彩票人数趋势" >
            {loading ? <Loading></Loading> :
              <PriceChart chartData={lotteryList} fields="firstPrice" />}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="奖金与买彩票人数趋势" >
            {loading ? <Loading></Loading> :
              <PriceChart chartData={lotteryList} fields="secondPrice" />}
          </Card>
        </Col>
      </Row> */}
      {loading ? <Card><Loading></Loading></Card> :
        <LoteryTable tableData={lotteryList}></LoteryTable>}
    </Space>
  </div>
}

export default Home