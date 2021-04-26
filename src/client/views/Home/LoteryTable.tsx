import {
  InfiniteScroll,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  Box
} from 'grommet'
import React from 'react'
import _ from 'lodash'
import { Lottery } from 'lottery'
const { useState } = React

interface Iprops {
  tableData:Lottery.data[]
}

const lotteryTable: React.FC<Iprops> = ({ tableData}) => {

  const step = 10;
  const list = _.chunk(tableData,10)
  const [listIndex, setIndex] = useState(0);

  const load = () => {
    if (listIndex>=list.length) return false
    setIndex(listIndex+1);
  };

  return <Box overflow="auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">期号</TableCell>
          <TableCell scope="col" border="bottom">前区号码</TableCell>
          <TableCell scope="col" border="bottom">后区</TableCell>
          <TableCell scope="col" border="bottom">奖池奖金(元)</TableCell>
          <TableCell scope="col" border="bottom">一等奖注数</TableCell>
          <TableCell scope="col" border="bottom">一等奖奖金</TableCell>
          <TableCell scope="col" border="bottom">二等奖注数</TableCell>
          <TableCell scope="col" border="bottom">二等奖奖金</TableCell>
          <TableCell scope="col" border="bottom">总投注额(元)</TableCell>
          <TableCell scope="col" border="bottom">开奖日期</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <InfiniteScroll
          renderMarker={marker => (
            <TableRow>
              <TableCell>{marker}</TableCell>
            </TableRow>
          )}
          scrollableAncestor="window"
          items={list[listIndex]}
          // onMore={() => load()}
          step={step}
        >
          {(rs: Lottery.data) => (
            <TableRow key={rs.uid}>
              <TableCell>{rs.uid}</TableCell>
              <TableCell>{rs.frontNums.join()}</TableCell>
              <TableCell>{rs.backNums.join()}</TableCell>
              <TableCell>{rs.prizePool}</TableCell>
              <TableCell>{rs.firstPriceNum}</TableCell>
              <TableCell>{rs.firstPrice}</TableCell>
              <TableCell>{rs.secondPriceNum}</TableCell>
              <TableCell>{rs.secondPrice}</TableCell>
              <TableCell>{rs.totalBet}</TableCell>
              <TableCell>{rs.date}</TableCell>
            </TableRow>
          )}
        </InfiniteScroll>
      </TableBody>
    </Table>
  </Box> 
}

export default lotteryTable