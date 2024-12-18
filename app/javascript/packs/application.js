import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../components/Auth/Auth';
import Feed from '../components/Feed/Feed';
import UserPage from '../components/User/UserPage';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth" component={Auth} />
        <PrivateRoute path="/feeds" component={Feed} />
        <PrivateRoute path="/:username" component={UserPage} />
        <Redirect from="/" to="/auth" />
      </Switch>
    </Router>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
});