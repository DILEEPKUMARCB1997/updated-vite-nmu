/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import { eventLogSelector } from '../../features/eventLogSlice'
import { useSelector } from 'react-redux'
import EventListCard from './EventListCard'

const EventList = () => {
  const { customEventHistoryData } = useSelector(eventLogSelector)
  console.log(customEventHistoryData)
  // let customEventListData = [
  //   {
  //     eventId: '1',
  //     severity: 'Information',
  //     hostname: 'EHG7512',
  //     createAt: ''
  //   }
  // ]
  // const data = customEventListData.map((item) => (
  //   <EventListCard
  //     // style={{ width: 300, height: 600 }}
  //     key={item.eventId}
  //     ledColor={
  //       item.severity === 'Information'
  //         ? '#46b300'
  //         : item.severity === 'Warning'
  //         ? '#F57F17'
  //         : '#D50000'
  //     }
  //     item={item}
  //   />
  // ))

  return (
    <div>
      {/* <EventListCard data={data} item={item} /> */}
      {customEventHistoryData.map((item) => (
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
    </div>
  )
}

export default EventList
