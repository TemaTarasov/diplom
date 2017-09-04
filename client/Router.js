import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './Controllers/Home';

export default class extends React.Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}