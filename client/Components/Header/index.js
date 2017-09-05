import React from 'react';

import { Row, Col } from 'antd';

export class Header extends React.Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row type="flex" justify="space-between" gutter={8}>
        {
          Array.isArray(this.props.children)
          ? this.props.children.map((item, i) =>
              <Col key={i}>{item}</Col>
            )
          : <Col>
              {this.props.children}
            </Col>
        }
      </Row>
    )
  }
}