import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:54:56
 * @modify date 2020-11-05 23:58:08
 * @desc [라우터 권한 체크]
 */
function AuthRoute({ component: Component, ...rest }) {
  const token = sessionStorage.getItem('token');

  return token ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/login" />
  );
}

export default AuthRoute;
