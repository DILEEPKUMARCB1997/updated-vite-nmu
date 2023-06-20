/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { eventLogSelector, updateCustomDataDaily } from '../../features/EventLogSlice'
import { Card, Col, Row } from 'antd'
const EventList = () => {
  const { customEventListData } = useSelector(eventLogSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updateCustomDataDaily(customEventListData))
  }, [])
  return (
    <div>
      <Row>
        <Col>
          <div style={{ fontSize: '18px', color: 'blue' }}>EventList</div>
          {customEventListData.map((item) => (
            <Card
              bordered={true}
              style={{ width: 400, height: 600, background: 'gray' }}
              key={item.eventId}
              ledColor={
                item.severity === 'Information'
                  ? '#46b300'
                  : item.severity === 'Warning'
                  ? '#F57F17'
                  : '#D50000'
              }
              item={item}
            ></Card>
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default EventList
