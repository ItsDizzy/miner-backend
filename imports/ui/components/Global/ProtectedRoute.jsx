import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route {...rest} render={props => {
    // Show a loader maybe?
    if (loggingIn) return <div></div>;

    return authenticated ?
      (React.createElement(component, { ...props, loggingIn, authenticated })) :
      (<Redirect
        to={{
          pathname: '/account/login',
          state: { from: props.location }
        }}
      />);
  }} />
);

ProtectedRoute.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
  component: PropTypes.func,
};

export default ProtectedRoute;