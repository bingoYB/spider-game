import React from 'react';
import Router from './router'
import { Route, Link } from 'react-router-dom'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { getCounter } from './api/webPVCounter'
const { useState,useEffect } = React;

const App: React.FunctionComponent = () => {

  const [webpv,setPv] = useState(0)

  useEffect(() => {
    getCounter().then((rs) => {
      setPv(rs)
    })
  }, [])

  return <Layout>
    <Header style={{ background: '#fff', padding: '0 24px 0 24px' }}>
      彩票数据
      <div style={{
        lineHeight: '31px',
        background: ' hsla(0,0%,100%,.2)',
        margin: '16px 0',
        float: 'right',
        textAlign: 'right',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
        <span style={{
          cursor: 'default',
          fontSize: '14px',
          paddingRight: '8px'
        }}>累计访问：{webpv} 次</span>
        <iframe src="https://ghbtns.com/github-btn.html?user=bingoYB&repo=spider-game&type=star&count=true" frameBorder="0" scrolling="0" width="102" height="20" title="GitHub"></iframe>
      </div>
    </Header>
    <Content style={{ margin: '20px' }}>
      <Router></Router>
    </Content>
  </Layout>
}

export default App