
import React from 'react'
import DeviceSummary from '../components/dashboard/DeviceSummary'
import DiskSpceSummary from '../components/dashboard/DiskSpaceSummary'
import { Card, Col, Row } from 'antd'
import TrapGraphSummary from '../components/dashboard/TrapGraphSummary'


const DashboardPage = () => {
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
              style={{ height: 150 }}
              bodyStyle={{ padding: '5px' }}
            >
              <DiskSpceSummary />
            </Card>
          </Col>
          <Col span={24}>
            <Card
              title="SNMP Trap Message Count"
              bordered={false}
              size="small"
              style={{ height: 300 }}
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
            <Card bordered={false}>Event graph</Card>
          </Col>
          <Col span={24}>
            <Card
              title="Syslog Message"
              bordered={false}
              size="small"
              style={{ height: 300 }}
              bodyStyle={{ padding: '5px' }}
            >
              <SyslogGraph1 />
            <Card title="EventGraph" bordered={false} bodyStyle={{ padding: '5px' }}>
              <EventLog />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Card
          title="EvenList"
          style={{ width: '100%', height: '100%' }}
          bordered={false}
          bodyStyle={{ padding: '5px' }}
        >
          <EventList />
        </Card>
      </Col>
    </Row>
  )
}

export default DashboardPage
