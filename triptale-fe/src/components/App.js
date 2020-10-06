import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { loginPage, MainPage } from 'pages';

import OAuth2Route from './OAuth2Route';

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hello TripTale</title>
      </Helmet>
      <Switch>
        <OAuth2Route path="/login-callback" component={MainPage}></OAuth2Route>
        <Route exact path="/" component={loginPage}></Route>
        <Route exact path="/login" component={loginPage}></Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
