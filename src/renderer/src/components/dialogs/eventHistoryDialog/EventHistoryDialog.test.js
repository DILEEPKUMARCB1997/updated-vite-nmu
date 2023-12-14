import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import EventHistoryDialog from './EventHistoryDialog'
import { store } from '../../../app/store'
import '@testing-library/jest-dom'
import { ipcRenderer } from 'electron'
import { RESPONSE_RP_GET_EVENT_LOG_HISTORY } from '../../../../../main/utils/IPCEvents'

jest.mock('electron', () => ({
  ipcRenderer: {
    on: jest.fn(),
    send: jest.fn()
  }
}))
describe('EventHistoryDialog', () => {
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
        <EventHistoryDialog />
      </Provider>
    )
    const modal = screen.getByRole('dialog', { name: 'Event History' })
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
        <EventHistoryDialog />
      </Provider>
    )
    const input = screen.getByPlaceholderText('MAC Address')
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
        <EventHistoryDialog handleRefreshButtonClick={refreshButton} />
      </Provider>
    )
    const button = screen.getByRole('Refresh')
    ipcRenderer.send(RESPONSE_RP_GET_EVENT_LOG_HISTORY)
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
        <EventHistoryDialog />
      </Provider>
    )
    const table = screen.findByRole('table')
    expect(table).toBeTruthy()
  })
})
