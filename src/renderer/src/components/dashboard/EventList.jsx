/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import { eventLogSelector } from '../../features/eventLogSlice'
import { useSelector } from 'react-redux'
import EventListCard from './EventListCard'
// let n = 5
// let string = ''
// for (let i = 0; i <= n; i++) {
//   for (let j = 0; j <= i / 2 - 1; j++) {
//     string = string + '*'
//   }
//   string = string + '\n'
// }
// console.log(string)
// function printNos(n) {
//   if (n > 0) {
//     printNos(n - 1)
//     console.log(n + ' ')
//   }
//   return
// }

// printNos(100)

const EventList = () => {
  const { customEventListData } = useSelector(eventLogSelector)
  // let customEventListData = [
  //   { eventId: 1, severity: 'Warning', createAt: '12pm', hostname: 'Dileep' }
  // ]
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
          createAt={item.createAt}
          hostname={item.hostname}
          item={item.item}
        />
      ))}
    </div>
  )
}

export default EventList
