import React from 'react';
import Component from '../../Component';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from '../../Components';
import { Home } from './Home';

import { NotFound } from '../NotFound';

export class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Router>
          <Switch>
            <Route location={this.props.location} exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}