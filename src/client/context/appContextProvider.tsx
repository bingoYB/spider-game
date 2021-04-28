import { Lottery } from 'lottery';
import React, { useState } from 'react';
import { globalData, AppContext, IAppContext } from './appContext';

const AppProvider = ({ children }: React.ProviderProps<{ value: IAppContext }>) => {

  const changeLotteryData = (data: Lottery.data[]) => {
    changeAppState((prevState) => ({
      ...prevState,
      lotteryData: {
        ...prevState.lotteryData,
        all: data
      },
    }));
  };

  const changeAnalyze = (data: Lottery.analyze) => {
    changeAppState((prevState) => ({
      ...prevState,
      lotteryData: { ...prevState.lotteryData, analyze: data }
    }));
  };


  const initAppState: IAppContext = {
    ...globalData,
    changeLotteryData,
    changeAnalyze
  };

  const [appState, changeAppState] = useState(initAppState);

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

export default AppProvider;
