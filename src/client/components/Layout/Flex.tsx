import React from 'react'

const Flex:React.FunctionComponent = ({children})=>{
  return <div style={{
    'display':'flex',
    'justifyContent':'space-around'
  }}>
    {children}
  </div>
}

export default Flex