import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';

import OAuth2Route from './OAuth2Route';
import AuthRoute from './AuthRoute';

const LoginPage = lazy(() => import('pages/LoginPage'));
const MainPage = lazy(() => import('pages/MainPage'));
const DaySchedulePage = lazy(() => import('pages/DaySchedulePage'));
const DaySchedulePlacePage = lazy(() => import('pages/DaySchedulePlacePage'));
const NotFoundErrorPage = lazy(() => import('pages/error/NotFoundErrorPage'));
const InternalServerErrorPage = lazy(() => import('pages/error/InternalServerErrorPage'));
const TokenNullErrorPage = lazy(() => import('pages/error/TokenNullErrorPage'));
const ForbiddenErrorPage = lazy(() => import('pages/error/ForbiddenErrorPage'));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:54:26
 * @modify date 2021-03-03 13:39:58
 * @desc [앱 기본, 라우터 설정]
 */
function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hello TripTale</title>
      </Helmet>
      <Switch>
        <OAuth2Route path="/login-callback"></OAuth2Route>
        <Suspense fallback={null}>
          <Route exact path="/login" component={LoginPage}></Route>
          <AuthRoute exact path="/" component={MainPage}></AuthRoute>
          <AuthRoute exact path="/trip" component={MainPage}></AuthRoute>
          <AuthRoute exact path="/trip/:srno" component={DaySchedulePage}></AuthRoute>
          <AuthRoute
            path="/trip/:srno/daySchedule/:daySrno/place"
            component={DaySchedulePlacePage}
          ></AuthRoute>
          <Route path="/error/500" component={InternalServerErrorPage}></Route>
          <Route path="/error/401" component={TokenNullErrorPage}></Route>
          <Route path="/error/404" component={NotFoundErrorPage}></Route>
          <Route path="/error/403" component={ForbiddenErrorPage}></Route>
          <Route exact component={NotFoundErrorPage}></Route>
        </Suspense>
      </Switch>
    </>
  );
}

export default App;
