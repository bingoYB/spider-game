import React from 'react'

const Flex:React.FunctionComponent = ({children})=>{
  return <div style={{
    'display':'flex',
    'justifyContent':'start'
  }}>
    {children}
  </div>
}

export default Flex