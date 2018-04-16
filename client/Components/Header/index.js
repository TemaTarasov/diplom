import React from 'react';
import Component from '../../Component';

import { Link } from 'react-router-dom';

import { Row, Col, Menu, Icon } from 'antd';

export class Header extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    debugger;
    this.state = {
      menu: 'home'
    };
  }

  /**
   * @param {event} e
   */
  handleClickMenu = e => {
    this.setState({
      menu: e.key
    });
  }

  render() {
    return (
      <Row type="flex" justify="space-between" gutter={8} className="header">
        <Col>
          <Icon type="api" className="header-logo"/>
        </Col>
        <Col>
          <Menu onClick={this.handleClickMenu} selectedKeys={[this.state.menu]} mode="horizontal">
            <Menu.Item key="home">
              <Link to="/">
                <Icon type="home"/> Главная
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    );
  }
}