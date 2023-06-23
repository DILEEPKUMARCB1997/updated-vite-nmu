/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Card, Tabs } from 'antd'
// eslint-disable-next-line no-unused-vars

import React, { useEffect } from 'react'
import Event from '../components/eventlog/Event'
import { useDispatch } from 'react-redux'
import {
  updateLogData,
  clearEventData,
  clearTrapData,
  clearSyslogData
} from '../features/eventLogSlice'
import Syslog from '../components/eventlog/Syslog'

var clearLogTimeOut

function EventLogPage() {
  const dispatch = useDispatch()

  const onChange = (key) => {
    console.log(key)
  }
  const items = [
    {
      key: '1',
      label: `Events`,
      children: <Event />
    },

    {
      key: '2',
      label: `SNMP Trap`,
      children: `Content of Tab Pane 2`
    },
    {
      key: '3',
      label: `syslog`,
      children: <Syslog />
    }
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
