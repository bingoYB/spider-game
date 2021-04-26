import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './views/Home';

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/home" component={Home} exact />
      </Switch>
    </HashRouter>
  );
}

export default Router;
