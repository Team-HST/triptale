import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { loginPage, MainPage } from 'pages';

import OAuth2Route from './OAuth2Route';
import AuthRoute from './AuthRoute';

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hello TripTale</title>
      </Helmet>
      <Switch>
        <OAuth2Route path="/login-callback"></OAuth2Route>
        <Route exact path="/" component={loginPage}></Route>
        <Route exact path="/login" component={loginPage}></Route>
        <AuthRoute exact path="/main" component={MainPage}></AuthRoute>
      </Switch>
    </React.Fragment>
  );
}

export default App;
