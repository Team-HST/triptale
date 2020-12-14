import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { loginPage, MainPage, DaySchedulePage } from 'pages';

import OAuth2Route from './OAuth2Route';
import AuthRoute from './AuthRoute';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:54:26
 * @modify date 2020-12-14 20:38:23
 * @desc [앱 기본, 라우터 설정]
 */
function App() {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hello TripTale</title>
      </Helmet>
      <Switch>
        <OAuth2Route path="/login-callback"></OAuth2Route>
        <Route exact path="/login" component={loginPage}></Route>
        <AuthRoute exact path="/" component={MainPage}></AuthRoute>
        <AuthRoute exact path="/trip" component={MainPage}></AuthRoute>
        <AuthRoute exact path="/trip/:srno" component={DaySchedulePage}></AuthRoute>
      </Switch>
    </React.Fragment>
  );
}

export default App;
