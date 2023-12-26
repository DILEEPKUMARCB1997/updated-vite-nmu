import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { store } from '../../../../app/store'
import OfflineDetection from '../../../dialogs/PreferencesDialog/Advanced/OfflineDetection'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

describe('OfflineDetection', () => {
  test('should render divider component', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <OfflineDetection />
      </Provider>
    )
    const divider = screen.getByText('Offline Detection')
    expect(divider).toBeInTheDocument()
  })
  test('should render OfflinePollIntervalValid ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const OfflinePollInterval = jest.fn()
    render(
      <Provider store={store}>
        <OfflineDetection handleOfflinePollIntervalInputOnChange={OfflinePollInterval} />
      </Provider>
    )
    const OfflineInterval = screen.getByTestId('offlineInterval')
    fireEvent.change(OfflineInterval)
    expect(OfflinePollInterval).toHaveBeenCalledTimes(0)
  })
  test('should render OfflineTimeoutValid', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const OfflineTimeout = jest.fn()
    render(
      <Provider store={store}>
        <OfflineDetection handleOfflineTimeoutInputOnChange={OfflineTimeout} />
      </Provider>
    )
    const offlineTime = screen.getByTestId('offlinetimeout')
    fireEvent.change(offlineTime)
    expect(OfflineTimeout).toHaveBeenCalledTimes(0)
  })
})
