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

const history = createBrowserHistory();

class AppRouter extends Component {
  render() {
    const { currentUser } = this.props;

    return (
      <Router history={history}>
        <AppFrame>
          <AppContent>
            <Switch>
              <Route path="/overview/:id?" component={Overview}/>
              <Route path="/account/workers" component={Workers}/>
              <Route path="/account/login" component={Login}/>
              <Route path="/account/register" component={Register}/>
              

              <Route exact path="/" render={() => (
                <Redirect to={currentUser ? '/overview' : '/account/login'} />
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

export default createContainer(() => {
  return {
      currentUser: Meteor.user(),
  };
}, AppRouter);