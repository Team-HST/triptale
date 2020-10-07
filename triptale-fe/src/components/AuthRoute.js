import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// User token check route
function AuthRoute({ component: Component, ...rest }) {
  const token = sessionStorage.getItem('token');

  return token ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/login" />
  );
}

export default AuthRoute;
