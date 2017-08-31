import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AppFrame from './AppFrame';
import AppContent from './AppContent';

import Overview from '../Overview/Overview';
import Test from '../Test';

const history = createBrowserHistory();

export default class AppRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <AppFrame>
          <AppContent>
            <Switch>
              <Route path="/test" component={Test}/>
              <Route path="/overview/:id?" component={Overview}/>
              <Route exact path="/" render={() => (
                <Redirect to="/overview" />
              )} />
              <Route path="*" render={() => (
                <div>404 - Not Found</div>
              )} />
            </Switch>
          </AppContent>
        </AppFrame>
      </Router>
    )
  }
}