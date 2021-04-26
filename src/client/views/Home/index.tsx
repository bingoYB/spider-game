import React from "react";
import CountUp from 'react-countup'
import Flex from '../../components/Layout/Flex'
import { Card, CardHeader, CardBody, Box} from 'grommet'
import LoteryTable from './LoteryTable'
import NumProbabilityChart from './NumProbabilityChart'
import Loading from '../../components/Loading'
import "./index.css"
import { getAnalyze } from '../../api/lotteryApi'
import { AppContext } from '../../context/appContext';
import { Lottery } from "lottery";

const {useContext,useState}  = React


const Home:React.FunctionComponent =  () => {

  const appState = useContext(AppContext)

  const { statistics,frontFigure,backFigure} = appState.lotteryData.analyze

  const [loading,setLoadState] = useState(false)

  if (frontFigure.length===0){
    getAnalyze().then(rs => {
      appState.changeAnalyze(rs)
      setLoadState(true)
    })
  }

  return <div>
    {loading?<Flex>
      <Card className="home-card">
        <CardHeader className="home-header">总共期数</CardHeader>
        <CardBody className="home-body">
          <CountUp end={statistics.total} className="count"></CountUp>
        </CardBody>
      </Card>
      <Card className="home-card">
        <CardHeader className="home-header">一等奖总人数</CardHeader>
        <CardBody className="home-body">
          <CountUp end={statistics.firstNum} className="count"></CountUp>
        </CardBody>
      </Card>
      <Card className="home-card">
        <CardHeader className="home-header">二等奖总人数</CardHeader>
        <CardBody className="home-body">
          <CountUp end={statistics.secondNum} className="count"></CountUp>
        </CardBody>
      </Card>
      <Card className="home-card">
        <CardHeader className="home-header">最新奖金奖池</CardHeader>
        <CardBody className="home-body">
          <CountUp end={statistics.latestPrice} className="count"></CountUp>
        </CardBody>
      </Card>
    </Flex>
    :<Flex><Loading></Loading></Flex>}
    <NumProbabilityChart chartData={frontFigure}/>
    <LoteryTable></LoteryTable>
  </div>
}

export default Home