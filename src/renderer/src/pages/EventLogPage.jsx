/* eslint-disable no-unused-vars */
import { Card, Tabs } from 'antd'
import React, { useEffect } from 'react'
import Event from '../components/eventlog/Event'
import { useDispatch } from 'react-redux'
import {
  updateLogData,
  clearEventData,
  clearTrapData,
  clearSyslogData
} from '../features/eventLogSlice'
import SNMPTrap from '../components/eventlog/SNMPTrap'
import Syslog from '../components/eventlog/Syslog'
// import CustomEvent from '../components/eventlog/CustomEvent/CustomEvent'

var clearLogTimeOut
function EventLogPage() {
  const dispatch = useDispatch()

  const items = [
    {
      key: '1',
      label: `Events`,
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
      children: <Syslog />
    }
    // {
    //   key: '4',
    //   label: `custom`,
    //   children: <CustomEvent />
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
        dispatch(clearEventData())
        dispatch(clearTrapData())
        dispatch(clearSyslogData())
      }, msToMidnight)
    }
    return () => {
      clearTimeout(clearLogTimeOut)
    }
  }, [])

  return (
    <div>
      <Card>
        <Tabs type="card" defaultActiveKey="1" items={items} />
      </Card>
    </div>
  )
}

export default EventLogPage
