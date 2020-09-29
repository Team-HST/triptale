import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { loginPage } from 'pages';

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hello TripTale</title>
      </Helmet>
      <Switch>
        <Route path="/" component={loginPage}></Route>
        <Route path="/login" exact component={loginPage}></Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
