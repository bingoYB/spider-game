import React from 'react';
const { useState,useReducer } = React

// 组件2
const Demo:React.FC = function () {

  const [count, dispatch] = useReducer((state: number,action: string)=>{
    if (action === 'add') {
      return state + 1;
    }
    return state;
  },0)

  const increment = () => {
    setTimeout(() => {
      dispatch('add');
    }, 1000);
  }

  console.log('excute')

  return <h1 onClick={increment}>test2{count}</h1>;
};

export default Demo