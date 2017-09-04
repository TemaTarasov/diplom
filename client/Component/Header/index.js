import React from 'react';

import { Row, Col } from 'antd';

export default class extends React.Component {
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
          this.props.children.map((item, i) => 
            <Col key={i}>{item}</Col>
          )
        }
      </Row>
    )
  }
}