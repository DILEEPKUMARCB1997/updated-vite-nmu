/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { eventLogSelector, updateCustomDataDaily } from '../../features/EventLogSlice'
import { Col, Row } from 'antd'
import EventListCard from './EventListCard'

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
            <EventListCard
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
            />
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default EventList
