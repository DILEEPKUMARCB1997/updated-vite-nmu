import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { store } from '../../app/store'
import FirmwareUpdate from '../dialogs/PreferencesDialog/Advanced/FirmwareUpdate'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

describe('FirmwareUpdate', () => {
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
        <FirmwareUpdate />
      </Provider>
    )
    const divider = screen.getByText('Firmware Update')
    expect(divider).toBeInTheDocument()
  })
  test('should render FWUpdateBatchQuantityValid ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const FWUpdateBatchQuantity = jest.fn()
    render(
      <Provider store={store}>
        <FirmwareUpdate handleFWUpdateBatchQuantityInputOnChange={FWUpdateBatchQuantity} />
      </Provider>
    )
    const BatchQuantity = screen.getByTestId('batchQuantity')
    fireEvent.change(BatchQuantity)
    expect(FWUpdateBatchQuantity).toHaveBeenCalledTimes(0)
  })
  test('should render FWUpdateConnTimeoutValid ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const FWUpdateConnTimeout = jest.fn()
    render(
      <Provider store={store}>
        <FirmwareUpdate handleConnectionTimeoutInputOnChange={FWUpdateConnTimeout} />
      </Provider>
    )
    const ConnectionTimeout = screen.getByTestId('connectiontime')
    fireEvent.change(ConnectionTimeout)
    expect(FWUpdateConnTimeout).toHaveBeenCalledTimes(0)
  })
})
