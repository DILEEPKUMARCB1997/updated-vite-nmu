/*
import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, jest, describe } from '@jest/globals'
import DashboardPage from './DashboardPage'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import '@testing-library/jest-dom/extend-expect'

describe('DashboardPage', () => {
  test('should render deviceSummary Card', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    )
    const deviceSummaryCard = screen.getByTitle('Device Summary')
    expect(deviceSummaryCard).toBeInTheDocument()
  })

  // test('renders the disk space summary card', () => {
  //   render(<DashboardPage />)
  //   const diskSpaceSummaryCard = screen.getByTitle('Disk Space Utilization Summary')
  //   expect(diskSpaceSummaryCard).toBeInTheDocument()
  // })

  // it('renders the SNMP trap graph summary card', () => {
  //   render(<DashboardPage />)
  //   const trapGraphSummaryCard = screen.getByTitle('SNMP Trap Message')
  //   expect(trapGraphSummaryCard).toBeInTheDocument()
  // })

  // it('renders the daily events card', () => {
  //   render(<DashboardPage />)
  //   const dailyEventsCard = screen.getByTitle('Daily Events')
  //   expect(dailyEventsCard).toBeInTheDocument()
  // })

  // it('renders the event log graph card', () => {
  //   render(<DashboardPage />)
  //   const eventLogGraphCard = screen.getByTitle('Events')
  //   expect(eventLogGraphCard).toBeInTheDocument()
  // })

  // it('renders the syslog graph card', () => {
  //   render(<DashboardPage />)
  //   const syslogGraphCard = screen.getByTitle('Syslog Message')
  //   expect(syslogGraphCard).toBeInTheDocument()
  // })

  // it('renders the event list card', () => {
  //   render(<DashboardPage />)
  //   const eventListCard = screen.getByTitle('EventList')
  //   expect(eventListCard).toBeInTheDocument()
  // })
})
*/
import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, jest, describe } from '@jest/globals'
import DashboardPage from './DashboardPage'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import '@testing-library/jest-dom/extend-expect'

describe('DashboardPage', () => {
  test('should render deviceSummary Card', () => {
    global.window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    )
    const deviceSummaryCard = screen.getByTestId('custom-element')
    expect(deviceSummaryCard).toBeInTheDocument()
  })
})
