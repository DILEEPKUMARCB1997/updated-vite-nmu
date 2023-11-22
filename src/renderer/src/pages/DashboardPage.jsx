/* eslint-disable no-unused-vars */
import React, { memo } from 'react'
import DeviceSummary from '../components/dashboard/DeviceSummary'
import DiskSpceSummary from '../components/dashboard/DiskSpaceSummary'
import { Card, Col, Row } from 'antd'
import TrapGraphSummary from '../components/dashboard/TrapGraphSummary'
import SyslogGraph from '../components/dashboard/SyslogGraph'
import EventSummary from '../components/dashboard/EventSummary'
import EventLogGraph from '../components/dashboard/EventLogGraph'
import EventList from '../components/dashboard/EventList'

const DashboardPage = memo(function DashboardPage() {
  return (
    <Row gutter={[8, 18]}>
      <Col span={9}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              title="Device Summary"
              bordered={false}
              size="small"
              style={{ height: 130 }}
              bodyStyle={{ padding: '5px' }}
            >
              <DeviceSummary />
            </Card>
          </Col>
          <Col span={24}>
            <Card
              title="Disk Space Utilization Summary"
              bordered={false}
              size="small"
              style={{ height: 250 }}
              bodyStyle={{ padding: '5px' }}
            >
              <DiskSpceSummary />
            </Card>
          </Col>
          <Col span={24}>
            <Card
              title="SNMP Trap Message"
              bordered={false}
              size="small"
              style={{ height: 250 }}
              bodyStyle={{ padding: '5px' }}
            >
              <TrapGraphSummary />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={9}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              title="Daily Events"
              bordered={false}
              size="small"
              style={{ height: 130 }}
              bodyStyle={{ padding: '5px' }}
            >
              <EventSummary />
            </Card>
          </Col>
          <Col span={24}>
            <Card
              title="Events"
              size="small"
              bordered={false}
              style={{ height: 250 }}
              bodyStyle={{ padding: '5px' }}
            >
              <EventLogGraph />
            </Card>
          </Col>
          <Col span={24}>
            <Card
              title="Syslog Message"
              bordered={false}
              size="small"
              style={{ height: 250 }}
              bodyStyle={{ padding: '5px' }}
            >
              <SyslogGraph />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Card
          title="EventList"
          size="small"
          style={{ width: '100%', height: '100%' }}
          bordered={false}
          bodyStyle={{ padding: '5px' }}
        >
          <EventList />
        </Card>
      </Col>
    </Row>
  )
})

export default DashboardPage

// import React, { memo, useMemo, useContext } from 'react'
// import DeviceSummary from '../components/dashboard/DeviceSummary'
// import DiskSpceSummary from '../components/dashboard/DiskSpaceSummary'
// import { Card, Col, Row } from 'antd'
// import TrapGraphSummary from '../components/dashboard/TrapGraphSummary'
// import SyslogGraph from '../components/dashboard/SyslogGraph'
// import EventSummary from '../components/dashboard/EventSummary'
// import EventLogGraph from '../components/dashboard/EventLogGraph'
// import EventList from '../components/dashboard/EventList'
// import { DashboardContext } from '../contexts/DashboardContext'

// const DashboardPage = memo(function DashboardPage() {
//   const { devices, events } = useContext(DashboardContext)

//   const deviceSummary = useMemo(() => {
//     // calculate device summary here
//     return {
//       total: devices.length,
//       online: devices.filter((device) => device.status === 'online').length,
//       offline: devices.filter((device) => device.status === 'offline').length,
//       alert: devices.filter((device) => device.alert).length
//     }
//   }, [devices])

//   const eventSummary = useMemo(() => {
//     // calculate event summary here
//     return {
//       total: events.length,
//       critical: events.filter((event) => event.priority === 'critical').length,
//       warning: events.filter((event) => event.priority === 'warning').length,
//       info: events.filter((event) => event.priority === 'info').length
//     }
//   }, [events])

//   return (
//     <Row gutter={[8, 18]}>
//       <Col span={9}>
//         <Row gutter={[8, 8]}>
//           <Col span={24}>
//             <Card
//               title="Device Summary"
//               bordered={false}
//               size="small"
//               style={{ height: 130 }}
//               bodyStyle={{ padding: '5px' }}
//             >
//               <DeviceSummary summary={deviceSummary} />
//             </Card>
//           </Col>
//           <Col span={24}>
//             <Card
//               title="Disk Space Utilization Summary"
//               bordered={false}
//               size="small"
//               style={{ height: 250 }}
//               bodyStyle={{ padding: '5px' }}
//             >
//               <DiskSpceSummary />
//             </Card>
//           </Col>
//           <Col span={24}>
//             <Card
//               title="SNMP Trap Message"
//               bordered={false}
//               size="small"
//               style={{ height: 250 }}
//               bodyStyle={{ padding: '5px' }}
//             >
//               <TrapGraphSummary />
//             </Card>
//           </Col>
//         </Row>
//       </Col>
//       <Col span={9}>
//         <Row gutter={[8, 8]}>
//           <Col span={24}>
//             <Card
//               title="Daily Events"
//               bordered={false}
//               size="small"
//               style={{ height: 130 }}
//               bodyStyle={{ padding: '5px' }}
//             >
//               <EventSummary summary={eventSummary} />
//             </Card>
//           </Col>
//           <Col span={24}>
//             <Card
//               title="Events"
//               size="small"
//               bordered={false}
//               style={{ height: 250 }}
//               bodyStyle={{ padding: '5px' }}
//             >
//               <EventLogGraph />
//             </Card>
//           </Col>
//           <Col span={24}>
//             <Card
//               title="Syslog Message"
//               bordered={false}
//               size="small"
//               style={{ height: 250 }}
//               bodyStyle={{ padding: '5px' }}
//             >
//               <SyslogGraph />
//             </Card>
//           </Col>
//         </Row>
//       </Col>
//       <Col span={6}>
//         <Card
//           title="EvenList"
//           size="small"
//           style={{ width: '100%', height: '100%' }}
//           bordered={false}
//           bodyStyle={{ padding: '5px' }}
//         >
//           <EventList />
//         </Card>
//       </Col>
//     </Row>
//   )
// })

// export default DashboardPage
