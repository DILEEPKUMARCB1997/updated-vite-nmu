import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import '@testing-library/jest-dom'
import { ipcRenderer } from 'electron'
import { RESPONSE_RP_GET_EVENT_LOG_HISTORY } from '../../../../../main/utils/IPCEvents'
import SyslogHistoryDialog from './SyslogHistoryDialog'

jest.mock('electron', () => ({
  ipcRenderer: {
    on: jest.fn(),
    send: jest.fn()
  }
}))
describe('SyslogHistoryDialog', () => {
  test('should render modal', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SyslogHistoryDialog />
      </Provider>
    )
    const modal = screen.getByRole('dialog', { name: 'Syslog History' })
    expect(modal).toBeInTheDocument()
  })
  test('should render input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SyslogHistoryDialog />
      </Provider>
    )
    const input = screen.getByPlaceholderText('Source IP')
    expect(input).toBeInTheDocument()
  })

  test.skip('should render button', () => {
    const refreshButton = jest.fn()
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SyslogHistoryDialog handleRefreshButtonClick={refreshButton} />
      </Provider>
    )
    const button = screen.getByRole('Refresh')
    fireEvent.click(button)
    expect(refreshButton).toHaveBeenCalledTimes(0)
  })
  test('should render table', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <SyslogHistoryDialog />
      </Provider>
    )
    const table = screen.findByRole('table')
    expect(table).toBeTruthy()
  })
})
