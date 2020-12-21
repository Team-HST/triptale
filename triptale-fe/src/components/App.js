import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import {
  loginPage,
  MainPage,
  DaySchedulePage,
  NotFoundErrorPage,
  InternalServerErrorPage,
  TokenNullErrorPage,
} from 'pages';

import OAuth2Route from './OAuth2Route';
import AuthRoute from './AuthRoute';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:54:26
 * @modify date 2020-12-21 21:15:19
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
        <AuthRoute path="/trip/:srno" component={DaySchedulePage}></AuthRoute>
        <Route path="/error/500" component={InternalServerErrorPage}></Route>
        <Route path="/error/401" component={TokenNullErrorPage}></Route>
        <Route component={NotFoundErrorPage}></Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
