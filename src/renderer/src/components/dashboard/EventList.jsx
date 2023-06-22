/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import { eventLogSelector } from '../../features/eventLogSlice'

import { useSelector } from 'react-redux'
import EventListCard from './EventListCard'

const EventList = () => {
  const { customEventListData } = useSelector(eventLogSelector)

  return (
    <div>
      {customEventListData.map((item) => (
        <EventListCard
          style={{ width: 300, height: 600 }}
          key={item.eventId}
          ledColor={
            item.severity === 'Information'
              ? '#46b300'
              : item.severity === 'Warning'
              ? '#F57F17'
              : '#D50000'
          }
          item={item}
        ></EventListCard>
      ))}
      {/* <EventListCard ledColor="#D50000" />
        <EventListCard ledColor="#F57F17" />
        <EventListCard ledColor="#46b300" />
        <EventListCard ledColor="#D50000" />
        <EventListCard ledColor="#F57F17" />
        <EventListCard ledColor="#46b300" />
        <EventListCard ledColor="#D50000" />
        <EventListCard ledColor="#F57F17" />
        <EventListCard ledColor="#46b300" />
        <EventListCard ledColor="#D50000" />
        <EventListCard ledColor="#F57F17" />
        <EventListCard ledColor="#46b300" /> */}
    </div>
  )
}

export default EventList
