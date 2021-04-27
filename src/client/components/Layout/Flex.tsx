import React from 'react'

const Flex:React.FunctionComponent = ({children})=>{
  return <div style={{
    'display':'flex',
    'justifyContent':'start',
    // 'flexWrap':'wrap',
  }}>
    {children}
  </div>
}

export default Flex