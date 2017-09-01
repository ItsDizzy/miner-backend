import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Router Middleware for Login and Register pages
 * 
 * This middleware makes sure a user can't visit certain pages when logged in
 */
const AuthRoute = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route {...rest} render={props => {
    // Show a loader maybe?
    if (loggingIn) return <div></div>;

    return !authenticated ?
      (React.createElement(component, { ...props, loggingIn, authenticated })) :
      (<Redirect to='/' />);
  }} />
);

AuthRoute.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
  component: PropTypes.func,
};

export default AuthRoute;