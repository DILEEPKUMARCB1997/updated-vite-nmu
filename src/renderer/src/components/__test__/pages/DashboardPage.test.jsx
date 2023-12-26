import { render, screen, waitFor } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'
import DashboardPage from '../../../pages/DashboardPage'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import { ipcRenderer } from 'electron'

describe.skip('DashboardPage', () => {
  beforeEach(() => {
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
  })

  test('renders dashboard page', async () => {
    const ipcRendererMock = {
      on: jest.fn(),
      send: jest.fn()
    }

    ipcRenderer.mockImplementation(() => ipcRendererMock)
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    await waitFor(() => {
      expect(screen.getByText('Device Summary')).toBeInTheDocument()
      //  expect(screen.getByText('Disk Space Utilization Summary')).toBeInTheDocument()
      expect(screen.getByText('SNMP Trap Message')).toBeInTheDocument()
      expect(screen.getByText('Daily Events')).toBeInTheDocument()
      expect(screen.getByText('Events')).toBeInTheDocument()
      // expect(screen.getByText('Syslog Message')).toBeInThe document()
      expect(screen.getByText('EventList')).toBeInTheDocument()
    })
  })
})

//Sudha A, Tue 2:40 PM
//The module factory of jest.mock() is not allowed to reference any out-of-scope variables #2567

/*
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DashboardPage from './DashboardPage'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { ipcRenderer } from 'electron'

describe('DashboardPage', () => {
 beforeEach(() => {
    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    )
 })

 test('renders dashboard page', async () => {
    const ipcRendererMock = {
      on: jest.fn(),
      send: jest.fn()
    }

    ipcRenderer.mockImplementation(() => ipcRendererMock)

    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query !== '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }
    })

    await waitFor(() => {
      expect(screen.getByText('Device Summary')).toBeInTheDocument()
      expect(screen.getByText('Disk Space Utilization Summary')).toBeInTheDocument()
      expect(screen.getByText('SNMP Trap Message')).toBeInTheDocument()
      expect(screen.getByText('Daily Events')).toBeInTheDocument()
      expect(screen.getByText('Events')).toBeInTheDocument()
      expect(screen.getByText('Syslog Message')).toBeInThe document()
      expect(screen.getByText('EventList')).toBeInTheDocument()
    })
 })
})
*/
