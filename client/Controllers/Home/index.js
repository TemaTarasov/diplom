import React from 'react';
import Component from '../../Component';

import { Link } from 'react-router-dom';

import { Icon } from 'antd';

import Header from '../../Component/Header';

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
        <Header>
          <Icon type="api" className="header-logo" />
          <div />
        </Header>
      </div>
    );
  }
}