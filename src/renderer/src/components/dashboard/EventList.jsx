/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import React from 'react'
import { eventLogSelector } from '../../features/eventLogSlice'
import { useSelector } from 'react-redux'
import EventListCard from './EventListCard'

const EventList = (item) => {
  const { customEventListData } = useSelector(eventLogSelector)
  console.log(customEventListData)
  return (
    <div>
      {customEventListData.map((item) => (
        <EventListCard
          // style={{ width: 300, height: 600 }}
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
      <EventListCard item={item} />
    </div>
  )
}

export default EventList
/*

import React from 'react'
import EventListCard from './EventListCard'
import { eventLogSelector } from '../../features/eventLogSlice'
import { useSelector } from 'react-redux'
const EventList = (item) => {
  // console.log(item)
  const { customEventListData } = useSelector(eventLogSelector)
  console.log(customEventListData)
  const eventListItems = customEventListData.map((item) => (
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
  ))
  return (
    <div>
      <EventListCard eventListItems={eventListItems} item={item} />
    </div>
  )
}
export default EventList
*/
