/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { eventLogSelector, initEventDailyData, updateLogData } from '../../features/eventLogSlice'
import { Row, Col, Card } from 'antd'
import SummaryCard from './SummaryCard'

var clearLogTimeOut1
const EventSummary = () => {
  const { customEventDailyData } = useSelector(eventLogSelector)
  const geteventdetails = () => {
    const information = customEventDailyData.filter((x) => x.severity === 'Information').length
    const warning = customEventDailyData.filter((x) => x.severity === 'Warning').length
    const critical = customEventDailyData.filter((x) => x.severity === 'Critical').length

    return { information, warning, critical }
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initEventDailyData({ types: 'custom' }))
    const now = new Date()
    const night = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)
    const msToMidnight = night.getTime() - now.getTime()
    if (msToMidnight > 0) {
      clearLogTimeOut1 = setTimeout(() => {
        dispatch(updateLogData())
      }, msToMidnight)
    }
    return () => {
      clearTimeout(clearLogTimeOut1)
    }
  }, [])
  return (
    <div>
      <Row gutter={8}>
        <Col span={8}>
          <SummaryCard
            title="Information"
            hbcolor="#46b300"
            bbcolor="#E8F5E9"
            bodylabel={geteventdetails().information}
          />
        </Col>
        <Col span={8}>
          <SummaryCard
            title="Warning"
            hbcolor="#F57F17"
            bbcolor="#FFFDE7"
            bodylabel={geteventdetails().warning}
          />
        </Col>
        <Col span={8}>
          <SummaryCard
            title="Critical"
            hbcolor="#D50000"
            bbcolor="#FFEBEE"
            bodylabel={geteventdetails().critical}
          />
        </Col>
      </Row>
    </div>
  )
}
export default EventSummary

// import React, { useEffect } from 'react'

// import { useDispatch, useSelector } from 'react-redux'
// import { eventLogSelector, initEventDailyData, updateLogData } from '../../features/eventLogSlice'
// import { Row, Col, Card } from 'antd'
// import SummaryCard from './SummaryCard'

// var clearLogTimeOut1
// const EventSummary = () => {
//   const { customEventDailyData } = useSelector(eventLogSelector)
//   const geteventdetails = () => {
//     const information = customEventDailyData.filter((x) => x.severity === 'Information').length
//     const warning = customEventDailyData.filter((x) => x.severity === 'Warning').length
//     const critical = customEventDailyData.filter((x) => x.severity === 'Critical').length

//     return { information, warning, critical }
//   }

//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(initEventDailyData({ types: 'custom' }))
//     const now = new Date()
//     const night = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate() + 1, // the next day, ...
//       0,
//       0,
//       0 // ...at 00:00:00 hours
//     )
//     const msToMidnight = night.getTime() - now.getTime()
//     if (msToMidnight > 0) {
//       clearLogTimeOut1 = setTimeout(() => {
//         // type: UPDATE_LOG_DATA,
//         // const filterCustomLogDailyData = filterByDate([...state.customEventDailyData])
//         // return {
//         //   ...state,
//         //   customEventDailyData: filterCustomLogDailyData
//         // }
//         dispatch(updateLogData())
//       }, msToMidnight)
//     }
//     return () => {
//       clearTimeout(clearLogTimeOut1)
//     }
//   }, [])
//   return (
//     <div
//     //className={styles.cardWrapper}
//     >
//       <Row gutter={8}>
//         <Col span={8}>
//           <SummaryCard
//             title="Information"
//             hbcolor="#46b300"
//             bbcolor="#E8F5E9"
//             bodylabel={geteventdetails().information}
//           />
//         </Col>
//         <Col span={8}>
//           <SummaryCard
//             title="Warning"
//             hbcolor="#F57F17"
//             bbcolor="#FFFDE7"
//             bodylabel={geteventdetails().warning}
//           />
//         </Col>
//         <Col span={8}>
//           <SummaryCard
//             title="Critical"
//             hbcolor="#D50000"
//             bbcolor="#FFEBEE"
//             bodylabel={geteventdetails().critical}
//           />
//         </Col>
//       </Row>
//     </div>
//   )
// }
// export default EventSummary
