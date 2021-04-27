import React from 'react'

const Clock: React.FC = () => {
  
  return <div style={{
    display: 'flex',
    boxSizing: 'border-box',
    maxWidth: '100%',
    minWidth: 0,
    minHeight: 0,
    flexDirection: 'row',
  }}>
    <div style={{
      position: 'relative',
      width: '0.8em',
      textAlign: 'center',
      overflow: 'hidden',
      fontSize: '18px',
      lineHeight: '1.375',
    }}></div>
  </div>
}