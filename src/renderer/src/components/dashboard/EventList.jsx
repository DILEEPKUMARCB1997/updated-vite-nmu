import React from 'react'
import { eventLogSelector } from '../../features/eventLogSlice'
import EventListCard from './EventListCard'
import { useSelector } from 'react-redux'

const EventList = () => {
  const { customEventListData } = useSelector(eventLogSelector)

  return (
    <div style={{ overflow: 'auto', height: 'calc(100vh - 12vh)' }}>
      {customEventListData.map((item) => (
        <EventListCard
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
    </div>
  )
}

export default EventList
