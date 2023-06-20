/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
// import styles from './EventListCard.scss'
import { Row, Col } from 'antd'
// import { Paper } from '@material-ui/core'

const EventListCard = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { model, createAt, sourceIP, msg, eventId, hostname } = props.item
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
