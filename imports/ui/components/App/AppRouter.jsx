import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AppFrame from './AppFrame';
import AppContent from './AppContent';

import Overview from '../Overview/Overview';

import Login from '../Account/Login';
import Register from '../Account/Register';
import Workers from '../Worker/Workers';
import Home from '../Home/Home';

import AuthRoute from '../Global/AuthRoute';
import ProtectedRoute from '../Global/ProtectedRoute';

const history = createBrowserHistory();

class AppRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <AppFrame>
          <AppContent>
            <Switch>
              <ProtectedRoute path="/overview/:id?" component={Overview} {...this.props}/>
              <ProtectedRoute path="/workers/:action?/:id?" component={Workers} {...this.props}/>
              <AuthRoute path="/account/login" component={Login} {...this.props}/>
              <AuthRoute path="/account/register" component={Register} {...this.props}/>

              <AuthRoute exact path="/" component={Home} {...this.props}/>
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

export default createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  return {
      loggingIn,
      authenticated: !loggingIn && !!Meteor.userId(),
  };
}, AppRouter);