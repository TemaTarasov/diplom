import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './Controllers/Home';

const HomeController = props => {
  return <Home {...props} menu="home" />
};

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
          <Route path="/" component={HomeController} />
        </Switch>
      </Router>
    );
  }
}