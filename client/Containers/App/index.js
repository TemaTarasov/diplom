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
            <Route path="/auth" component={Home} />
            <Route path="/sing-in" component={Home} />
            <Route path="/sing-up" component={Home} />

            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}