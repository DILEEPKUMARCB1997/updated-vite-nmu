/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Card, Tabs } from 'antd'
// eslint-disable-next-line no-unused-vars
//import TabPane from 'antd/es/tabs/TabPane'
import React, { useEffect } from 'react'

import Event from '../components/eventlog/Event'
import { useDispatch } from 'react-redux'
import {
  updateLogData,
  clearEventData,
  clearTrapData,
  clearSyslogData
} from '../features/eventLogSlice'
// import SNMPTrap from '../components/eventlog/SNMPTrap'
//import TrapHistoryDialog from '../components/dialogs/TrapHistoryDialog/TrapHistoryDialog
// var clearLogTimeOut
import TrapHistoryDialog from '../components/dialogs/TrapHistoryDialog/TrapHistoryDialog'
import SNMPTrap from '../components/eventlog/SNMPTrap'
var clearLogTimeOut
function EventLogPage() {
  const dispatch = useDispatch()

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
      children: <SNMPTrap />
    },
    {
      key: '3',
      label: `Syslog`,
      children: `Content of Tab Pane 4`
    }
    // {
    //   key: '4',
    //   label: `Custom Event`,
    //   children: `Content of Tab Pane 4`
    // }
  ]

  useEffect(() => {
    dispatch(updateLogData())
    const now = new Date()
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // the next day, ...
      0,
      0,
      0 // ...at 00:00:00 hours
    )
    const msToMidnight = night.getTime() - now.getTime()
    if (msToMidnight > 0) {
      clearLogTimeOut = setTimeout(() => {
        clearEventData()
        clearTrapData()
        clearSyslogData()
      }, msToMidnight)
    }
    return () => {
      clearTimeout(clearLogTimeOut)
    }
  }, [])

  return (
    <div>
      <Card>
        <Tabs type="card" defaultActiveKey="1" items={items} onChange={onChange} />
      </Card>
    </div>
  )
}

export default EventLogPage
