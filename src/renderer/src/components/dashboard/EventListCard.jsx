/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*
import React from 'react'
import { Row, Col } from 'antd'

const EventListCard = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { createAt, sourceIP, msg, eventId, hostname } = props
  return (
    <div key={eventId}>
      <Row style={{ marginBottom: '5px' }}>
        <Col span={12} style={{ textAlign: 'left' }}>
          {hostname}
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          {createAt}
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <Row>
            <Col span={24} style={{ textAlign: 'left' }}>
              {sourceIP}
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              {msg}
            </Col>
          </Row>
        </Col>
        <Col flex="60px" style={{ textAlign: 'center', margin: 'auto' }}>
          <svg height="40" width="40">
            <circle cx="20" cy="20" r="17" stroke="inherit" strokeWidth="2" fill={props.ledColor} />
            Sorry, your browser does not support inline SVG.
          </svg>
        </Col>
      </Row>
    </div>
  )
}

export default EventListCard
*/

import React from 'react'
import { Row, Col, Card } from 'antd'
const EventListCard = (props) => {
  const { createAt, sourceIP, msg, eventId, hostname } = props
  return (
    <div key={eventId}>
      <Card>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={12} style={{ textAlign: 'left' }}>
            {hostname}
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            {createAt}
          </Col>
        </Row>
        <Row>
          <Col flex="auto">
            <Row>
              <Col span={24} style={{ textAlign: 'left' }}>
                {sourceIP}
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'center' }}>
                {msg}
              </Col>
            </Row>
          </Col>
          <Col flex="60px" style={{ textAlign: 'center', margin: 'auto' }}>
            <svg height="40" width="40">
              <circle
                cx="20"
                cy="20"
                r="17"
                stroke="inherit"
                strokeWidth="2"
                fill={props.ledColor}
              />
              Sorry, your browser does not support inline SVG.
            </svg>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
export default EventListCard
