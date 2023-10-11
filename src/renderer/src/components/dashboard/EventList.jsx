/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import React from 'react'
import { eventLogSelector } from '../../features/eventLogSlice'
import EventListCard from './EventListCard'
import { useSelector } from 'react-redux'

const EventList = () => {
  const { customEventHistoryData } = useSelector(eventLogSelector)
  console.log(customEventHistoryData)

  return (
    <div style={{ overflow: 'auto', height: 'calc(100vh - 19vh)' }}>
      {customEventHistoryData.map((item) => (
        <EventListCard
          key={item.eventId}
          ledColor={
            item.severity === 'Information'
              ? '#46b300'
              : item.severity === 'Warning'
              ? '#F57F17'
              : '#D50000'
          }
          createAt={item.createAt}
          hostname={item.hostname}
          item={item.item}
        />
      ))}
    </div>
  )
}

export default EventList
