import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { App } from './Containers/App';
import { Dashboard } from './Containers/Dashboard';
import { NotFound } from './Containers/NotFound';

export default class extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={App} />

        </Switch>
      </Router>
    );
  }
}