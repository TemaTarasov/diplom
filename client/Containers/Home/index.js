import React from 'react';
import Component from '../../Component';

import { Header } from '../../Components';

export class Home extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header menu={this.props.menu} />
      </div>
    );
  }
}