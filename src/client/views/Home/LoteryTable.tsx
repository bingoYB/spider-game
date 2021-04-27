import VirtualTable from '../../components/Table/VirtualTable'
import React from 'react'
import _ from 'lodash'
import { Lottery } from 'lottery'
import { Card } from 'antd'

interface Iprops {
  tableData:Lottery.data[]
}

interface IBallProps{
  num:number,
  type:string
}

export const Ball: React.FC<IBallProps> = (props)=>{
  return <span className={`${props.type} ball`}>{props.num}</span>
}

const lotteryTable: React.FC<Iprops> = ({ tableData}) => {

  let columns = [
    { title: '期号', dataIndex: 'uid', width: 70,},
    {
      title: '前区号码', dataIndex: 'frontNums',width:150, render(frontNums: number[]){
        return frontNums.map(num => <Ball key={num} type="front" num={num}></Ball>)
    }},
    {
      title: '后区', dataIndex: 'backNums', width: 70, render(backNums: number[]) {
        return backNums.map(num => <Ball key={num} type="back" num={num}></Ball>)
      }},
    { title: '奖池奖金(元)', dataIndex: 'prizePool'},
    { title: '一等奖注数', dataIndex: 'firstPriceNum'},
    { title: '一等奖奖金', dataIndex: 'firstPrice',width: 120,},
    { title: '二等奖注数', dataIndex: 'secondPriceNum'},
    { title: '二等奖奖金', dataIndex: 'secondPrice', width: 120,},
    { title: '总投注额(元)', dataIndex: 'totalBet', width: 120,},
    { title: '开奖日期', dataIndex: 'date',render(date:string|number){
      return new Date(Number(date)).toLocaleDateString()
    }},
  ];

  columns = columns.map(el=>({...el,align: 'center'}))

  const data = _.compact(tableData).reverse()

  return <Card title="每期开奖信息">
    <VirtualTable columns={columns} dataSource={data} scroll={{ y: 460, x: '100vw' }} />
  </Card>
}

export default lotteryTable