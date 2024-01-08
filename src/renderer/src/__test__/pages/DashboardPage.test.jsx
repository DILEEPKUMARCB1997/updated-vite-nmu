import { render, screen, waitFor } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'
import DashboardPage from '../../pages/DashboardPage'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import { ipcRenderer } from 'electron'

jest.mock('react-apexcharts')
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
