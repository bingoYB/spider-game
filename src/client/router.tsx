import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Demo from './views/demo';

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/home" component={Home} exact />
        <Route path="/demo" component={Demo} />
      </Switch>
    </HashRouter>
  );
}

export default Router;
