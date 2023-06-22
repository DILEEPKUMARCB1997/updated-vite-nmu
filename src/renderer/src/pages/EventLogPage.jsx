/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Card, Tabs } from 'antd'
import React from 'react'
import Event from '../components/eventlog/Event'
import Syslog from '../components/eventlog/Syslog'
import SyslogHistoryDialog from '../components/dialogs/SyslogHistoryDialog/SyslogHistoryDialog'

function EventLogPage() {
  const onChange = (key) => {
    console.log(key)
  }
  const items = [
    {
      key: '1',
      label: `syslogHistoryDialog`,
      children: <SyslogHistoryDialog />
    },
    {
      key: '2',
      label: `SNMP Trap`,
      children: `Content of Tab Pane 2`
    },
    {
      key: '3',
      label: `Syslog`,
      children: <Syslog />
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
