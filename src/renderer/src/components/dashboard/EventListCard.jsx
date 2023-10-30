/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react'
import { Row, Col, Card } from 'antd'

import { useTheme } from 'antd-style'

const EventListCard = (props) => {
  const token = useTheme()
  const { createAt, sourceIP, msg, eventId, hostname } = props.item

  return (
    <div
      style={{
        boxSizing: 'border-box',

        display: 'flex',
        flexDirection: 'column'
      }}
      key={eventId}
    >
      <Card
        style={{
          borderRadius: '0px',
          padding: '0px',
          fontWeight: '500',
          color: '#000000ed',
          margin: '0px 2px 5px 0px'
        }}
        bodyStyle={{ padding: '5px', backgroundColor: token.colorBorderSecondary }}
      >
        <Row style={{ marginBottom: '5px' }}>
          <Col span={10} style={{ textAlign: 'left' }}>
            {hostname}
          </Col>
          <Col span={14} style={{ textAlign: 'right' }}>
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
