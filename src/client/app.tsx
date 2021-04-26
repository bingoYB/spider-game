import React from 'react';
import Router from './router'
import { Grommet, Header, Main, Box, Clock} from 'grommet'
import {Route,Link} from 'react-router-dom'

const App: React.FunctionComponent = ()=> {
  return <Grommet>
    <Header>
      彩票数据
      <Clock type="digital" />
    </Header>
    <Main pad="large">
      <Box>
        <Router></Router>
      </Box>
    </Main>
  </Grommet>
}

export default App