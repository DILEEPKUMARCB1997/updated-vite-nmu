/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Card, Tabs } from 'antd'
// eslint-disable-next-line no-unused-vars
import TabPane from 'antd/es/tabs/TabPane'
import React, { useEffect } from 'react'
// import Event from '../components/eventlog/Event'
import SNMPTrap from '../components/eventlog/SNMPTrap'
// import { clearTrapData, updateLogData } from '../features/eventLogSlice'

// var clearLogTimeOut
function EventLogPage() {
  const onChange = (key) => {
    console.log(key)
  }
  const items = [
    {
      key: '1',
      label: `Event`,
      children: `Content of Tab Pane 1`
    },
    {
      key: '2',
      label: `SNMP Trap`,
      children: <SNMPTrap />
    },
    {
      key: '3',
      label: `Syslog`,
      children: `Content of Tab Pane 3`
    }
  ]

  // useEffect(() => {
  //   updateLogData()
  //   const now = new Date()
  //   const night = new Date(
  //     now.getFullYear(),
  //     now.getMonth(),
  //     now.getDate() + 1, // the next day, ...
  //     0,
  //     0,
  //     0 // ...at 00:00:00 hours
  //   )
  //   const msToMidnight = night.getTime() - now.getTime()
  //   if (msToMidnight > 0) {
  //     clearLogTimeOut = setTimeout(() => {
  //       clearTrapData()
  //     }, msToMidnight)
  //   }
  // }, [])
  return (
    <div>
      <Card>
        <Tabs type="card" defaultActiveKey="1" items={items} onChange={onChange} />
      </Card>
    </div>
  )
}

export default EventLogPage
