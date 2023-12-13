/* eslint-disable no-unused-vars */
import React, { memo, useMemo } from 'react'
import DeviceSummary from '../components/dashboard/DeviceSummary'
import DiskSpceSummary from '../components/dashboard/DiskSpaceSummary'
import { Card, Col, Row } from 'antd'
import TrapGraphSummary from '../components/dashboard/TrapGraphSummary'
import SyslogGraph from '../components/dashboard/SyslogGraph'
import EventSummary from '../components/dashboard/EventSummary'
import EventList from '../components/dashboard/EventList'
import EventLogGraph from '../components/dashboard/EventLogGraph'

const DashboardPage = () => {
  const deviceSummary = useMemo(() => <DeviceSummary />, [])
  const diskSpceSummary = useMemo(() => <DiskSpceSummary />, [])
  const trapGraphSummary = useMemo(() => <TrapGraphSummary />, [])
  const eventSummary = useMemo(() => <EventSummary />, [])
  const eventLogGraph = useMemo(() => <EventLogGraph />, [])
  const syslogGraph = useMemo(() => <SyslogGraph />, [])
  const eventList = useMemo(() => <EventList />, [])
  return (
    <Row gutter={[8, 18]}>
      <Col span={9}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              data-testid="devicesummary"
              title="Device Summary"
              bordered={false}
              size="small"
              style={{ height: 130 }}
              bodyStyle={{ padding: '5px' }}
            >
              {deviceSummary}
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
              {diskSpceSummary}
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
              {trapGraphSummary}
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
              {eventSummary}
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
              {eventLogGraph}
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
              {syslogGraph}
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
          {eventList}
        </Card>
      </Col>
    </Row>
  )
}

export default DashboardPage
