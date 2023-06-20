/* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-undef */
// /* eslint-disable prettier/prettier */
// /* eslint-disable no-unused-vars */
// import React, { useEffect } from 'react'
// // import {
// //   REQUEST_MP_GET_EVENT_LOG_HISTORY,
// //   RESPONSE_RP_GET_EVENT_LOG_HISTORY
// // } from '../../../main/utils/IPCEvents'
// import {
//   REQUEST_MP_GET_EVENT_LOG_HISTORY,
//   RESPONSE_RP_GET_EVENT_LOG_HISTORY
// } from '../../../../main/utils/IPCEvents'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   eventLogSelector,
//   updateCustomDataDaily,
//   clearHistoryData,
//   updateCustomHistory
// } from '../../features/EventLogSlice'
// import { Row, Col, Card } from 'antd'

// const EventSummary = () => {
//   const { customEventDailyData } = useSelector(eventLogSelector)
//   const dispatch = useDispatch()
//   const customEventData = () => {
//     const information = customEventDailyData.filter((x) => x.severity === 'Information').length
//     const critical = customEventDailyData.filter((x) => x.severity === 'Critical').length
//     const warning = customEventDailyData.filter((x) => x.severity === 'Warning').length

//     return { information, critical, warning }
//   }
//   useEffect(() => {
//     window.electron.ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
//       const { type, data } = arg
//       switch (type) {
//         case 'custom':
//           dispatch(updateCustomHistory(data))
//           dispatch(customEventData(updateCustomDataDaily))
//           dispatch(clearHistoryData())
//           break
//       }
//     })

//     window.electron.ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, {
//       sourceIP: '',
//       ge: '',
//       le: ''
//     })
//     var clearLogTimeOut1

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
//         this.props.updateLogData()
//       }, msToMidnight)
//     }
//   }, [])

//   return (
//     <div>
//       <Row gutter={8}>
//         <Col span={8}>
//           <Card
//             title="Information"
//             headStyle={{
//               minHeight: '50px',
//               backgroundColor: '#3cb371',
//               color: '#E8F5E9',
//               textAlign: 'center',
//               padding: '0 10px',
//               border: 'solid'
//             }}
//             bodyStyle={{
//               backgroundColor: '#b4b4b4',
//               textAlign: 'center',
//               color: 'black',
//               padding: '0 10px',
//               fontSize: '1.4rem',
//               fontWeight: 'bold'
//             }}
//             style={{
//               backgroundColor: '#00FF00',
//               width: 150,
//               // marginTop: 16,
//               // minHeight: '31px',
//               hbcolor: '#F57F17'
//             }}
//             // bodylabel={information}
//           >
//             {customEventData().information}
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card
//             title="Warning"
//             headStyle={{
//               minHeight: '50px',
//               backgroundColor: '#ffa500',
//               color: '#E8F5E9',
//               textAlign: 'center',
//               padding: '0 10px',
//               border: 'solid'
//             }}
//             bodyStyle={{
//               backgroundColor: '#b4b4b4',
//               textAlign: 'center',
//               color: 'black',
//               padding: '0 10px',
//               fontSize: '1.4rem',
//               fontWeight: 'bold'
//             }}
//             style={{
//               backgroundColor: '#00FF00',
//               width: 150,
//               // marginTop: 16,
//               // minHeight: '31px',
//               hbcolor: '#F57F17'
//             }}
//             // style={{ backgroundColor: '#ffa500', width: 150, marginTop: 16 }}
//             // bodylabel={warning}
//           >
//             {customEventData().warning}
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card
//             title="Critical"
//             headStyle={{
//               minHeight: '50px',
//               backgroundColor: '#ff0000',
//               color: '#E8F5E9',
//               textAlign: 'center',
//               padding: '0 10px',
//               border: 'solid'
//             }}
//             bodyStyle={{
//               backgroundColor: '#b4b4b4',
//               textAlign: 'center',
//               color: 'black',
//               padding: '0 10px',
//               fontSize: '1.4rem',
//               fontWeight: 'bold'
//             }}
//             style={{
//               backgroundColor: '#00FF00',
//               width: 150,
//               // marginTop: 16,
//               // minHeight: '31px',
//               hbcolor: '#F57F17'
//             }}
//             // style={{ backgroundColor: '#ff0000', width: 150, marginTop: 16 }}

//             // bodylabel={critical}
//           >
//             {customEventData().critical}
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   )
// }

// export default EventSummary

import React from 'react'

const EventSummary = () => {
  return <div>EventSummary</div>
}

export default EventSummary
