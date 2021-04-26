import React from 'react' 
import ReactDOM from 'react-dom'
import Loading  from './components/Loading'
import AppContextProvider from './context/appContextProvider';

const { lazy, Suspense } = React;

const App = lazy(() => import('./app'));

ReactDOM.render(
  <Suspense fallback={<Loading/>}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </Suspense>,
  document.getElementById('root')
);
