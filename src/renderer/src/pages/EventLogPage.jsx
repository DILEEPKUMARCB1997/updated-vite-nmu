/* eslint-disable no-unused-vars */
import { Card, Tabs } from 'antd'
// eslint-disable-next-line no-unused-vars
import TabPane from 'antd/es/tabs/TabPane'
import React from 'react'
// import Event from '../components/eventlog/Event'

function EventLogPage() {
  const onChange = (key) => {
    console.log(key)
  }
  const items = [
    {
      key: '1',
      label: `Event`,
      children: <Event />
    },
    {
      key: '2',
      label: `SNMP Trap`,
      children: `Content of Tab Pane 2`
    },
    {
      key: '3',
      label: `Syslog`,
      children: `Content of Tab Pane 3`
    },
    {
      key: '4',
      label: `Custom Event`,
      children: `Content of Tab Pane 4`
    }
  ]
  return (
    <div>
      <Card>
        <Tabs type="card" defaultActiveKey="1" items={items} onChange={onChange} />
      </Card>
    </div>
  )
}

export default EventLogPage
