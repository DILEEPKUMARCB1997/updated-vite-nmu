/* eslint-disable prettier/prettier */
import { Card, Col, Row } from 'antd'
import EventLog from '../components/dashboard/EventLog'
import DeviceSummary from '../components/dashboard/DeviceSummary'
import DiskSpaceSummary from '../components/dashboard/DiskSpaceSummary'
import EventList from '../components/dashboard/EventList'
import EventSummary from '../components/dashboard/EventSummary'

const DashboardPage = () => {
  return (
    <Row gutter={[8, 18]}>
      <Col span={9}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card bordered={false}>
              DeviceSummary
              <DeviceSummary />
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={false}>
              DiskSpaceSummary <DiskSpaceSummary />
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={false}>SNMPTrap</Card>
          </Col>
        </Row>
      </Col>
      <Col span={9}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card bordered={false}>
              <EventSummary />
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={false} style={{ width: '100%', height: '100%', padding: ' 0px 5px' }}>
              <EventLog />
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={false}>Syslog graph</Card>
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Card bordered={false} style={{ width: '100%', height: '100%', padding: '0px 5px' }}>
          <EventList />
        </Card>
      </Col>
    </Row>
  )
}

export default DashboardPage
