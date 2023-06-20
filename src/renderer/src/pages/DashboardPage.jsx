/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
// import DeviceSummary from '../components/dashboard/DeviceSummary'
// import DiskSpceSummary from '../components/dashboard/DiskSpceSummary'
import EventSummary from '../components/dashboard/EventSummary'
import SyslogGraph1 from '../components/dashboard/SyslogGraph1'
import { Card, Col, Row } from 'antd'

const DashboardPage = () => {
  return (
    <Row gutter={[8, 18]}>
      <Col span={9}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card bordered={false} style={{ width: '100%' }}>
              Device summary
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={false} style={{ width: '100%' }}>
              Disk Space
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={false} style={{ width: '100%' }}>
              SNMP trap
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={9}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card bordered={false} style={{ width: '100%' }}>
              <div className="summaryContent">
                <div style={{ padding: '0px 10px', fontSize: '15px', color: 'green' }}>
                  Daily Events
                </div>
                <pre />
                <div>
                  {' '}
                  <EventSummary />
                </div>
              </div>
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={false} style={{ width: '100%' }}>
              Event graph
            </Card>
          </Col>
          <Col span={24}>
            <Card
              bordered={false}
              className="graphContent"
              style={{ width: '100%', height: '100%' }}
            >
              {' '}
              <SyslogGraph1 />{' '}
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Card bordered={false} style={{ width: '100%' }}>
          Event list
        </Card>
      </Col>
    </Row>
  )
}

export default DashboardPage
