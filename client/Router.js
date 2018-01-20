import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { App } from './Containers/App/index';

export default class extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={App}/>
        </Switch>
      </Router>
    );
  }
}