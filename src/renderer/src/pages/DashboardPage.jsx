// import React from 'react'
// import DeviceSummary from '../components/dashboard/DeviceSummary'
// import DiskSpceSummary from '../components/dashboard/DiskSpceSummary'
import { Card, Col, Row } from 'antd'

const DashboardPage = () => {
  return (
    <Row gutter={[8, 18]}>
      <Col span={9}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card bordered={false}>Device summary</Card>
          </Col>
          <Col span={24}>
            <Card bordered={false}>Disk Space</Card>
          </Col>
          <Col span={24}>
            <Card bordered={false}>SNMP trap</Card>
          </Col>
        </Row>
      </Col>
      <Col span={9}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card bordered={false}>Daily Events</Card>
          </Col>
          <Col span={24}>
            <Card bordered={false}>Event graph</Card>
          </Col>
          <Col span={24}>
            <Card bordered={false}>Syalog graph</Card>
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Card bordered={false}>Event list</Card>
      </Col>
    </Row>
  )
}

export default DashboardPage
