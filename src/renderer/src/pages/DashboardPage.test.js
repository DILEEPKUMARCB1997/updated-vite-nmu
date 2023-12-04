import React from 'react'
import { render } from '@testing-library/react'
import { Row, Col, Card } from 'antd'
import DashboardPage from './DashboardPage'

describe('DashboardPage', () => {
  test('renders DeviceSummary component', () => {
    const component = render(<DashboardPage />)
    console.log(component)
    const deviceSummary = screen.getByTitle('Device Summary')
    expect(deviceSummary).toBeInTheDocument()
  })

  // it('renders DiskSpaceSummary component', () => {
  //   render(<DashboardPage />)
  //   const diskSpaceSummary = screen.getByTitle('Disk Space Utilization Summary')
  //   expect(diskSpaceSummary).toBeInTheDocument()
  // })

  // it('renders TrapGraphSummary component', () => {
  //   render(<DashboardPage />)
  //   const trapGraphSummary = screen.getByTitle('SNMP Trap Message')
  //   expect(trapGraphSummary).toBeInTheDocument()
  // })

  // it('renders EventSummary component', () => {
  //   render(<DashboardPage />)
  //   const eventSummary = screen.getByTitle('Daily Events')
  //   expect(eventSummary).toBeInTheDocument()
  // })

  // it('renders EventLogGraph component', () => {
  //   render(<DashboardPage />)
  //   const eventLogGraph = screen.getByTitle('Events')
  //   expect(eventLogGraph).toBeInTheDocument()
  // })

  // it('renders SyslogGraph component', () => {
  //   render(<DashboardPage />)
  //   const syslogGraph = screen.getByTitle('Syslog Message')
  //   expect(syslogGraph).toBeInTheDocument()
  // })

  // it('renders EventList component', () => {
  //   render(<DashboardPage />)
  //   const eventList = screen.getByTitle('EventList')
  //   expect(eventList).toBeInTheDocument()
  // })
})
