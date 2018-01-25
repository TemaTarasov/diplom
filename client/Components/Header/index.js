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

    this.state = {
      menu: props.menu || ''
    };

    this.bindMethods([
      'handleClickMenu'
    ]);
  }

  /**
   * @param {Event} event
   */
  handleClickMenu(event) {
    this.setState({
      menu: event.key
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