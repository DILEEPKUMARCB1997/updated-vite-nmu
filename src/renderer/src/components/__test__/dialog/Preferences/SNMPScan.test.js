import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { store } from '../../../../app/store'
import { Provider } from 'react-redux'
import SNMPScan from '../../../dialogs/PreferencesDialog/SNMP/SNMPScan/SNMPScan'

describe('SNMPScan', () => {
  test('should render divider', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SNMPScan />
      </Provider>
    )
    const dividerElement = screen.getByText('SNMP Scan')
    expect(dividerElement).toBeInTheDocument()
  })
  test('should render switch component', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const SNMPSwitchOnChange = jest.fn()
    render(
      <Provider store={store}>
        <SNMPScan handleEnableSNMPSwitchOnChange={SNMPSwitchOnChange} />
      </Provider>
    )
    const Switch = screen.getByRole('switch')
    fireEvent.click(Switch)
    expect(Switch).toBeChecked()
    expect(SNMPSwitchOnChange).toHaveBeenCalledTimes(0)
  })
  test('should render Enable Title ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SNMPScan />
      </Provider>
    )
    const title = screen.getByText('Enable')
    expect(title).toBeInTheDocument()
  })
  test('should render divider component ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SNMPScan />
      </Provider>
    )
    const title = screen.getByTestId('divider-comp')
    expect(title).toBeInTheDocument()
  })
  test('should render SNMPPollInterval ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const SNMPPollIntervalInputOnChange = jest.fn()
    render(
      <Provider store={store}>
        <SNMPScan handleSNMPPollIntervalInputOnChange={SNMPPollIntervalInputOnChange} />
      </Provider>
    )
    const SNMPPollInput = screen.getByTestId('isSNMPPoll')
    fireEvent.change(SNMPPollInput)
    expect(SNMPPollIntervalInputOnChange).toHaveBeenCalledTimes(0)
  })
  test('should render ICMPTimeout', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const ICMPTimeoutInputOnChange = jest.fn()
    render(
      <Provider store={store}>
        <SNMPScan handleICMPTimeoutInputOnChange={ICMPTimeoutInputOnChange} />
      </Provider>
    )
    const ICMPTimeInput = screen.getByTestId('isICMPTime')
    fireEvent.change(ICMPTimeInput)
    expect(ICMPTimeoutInputOnChange).toHaveBeenCalledTimes(0)
  })
  test('should render SNMPTimeout', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const SNMPTimeoutInputOnChange = jest.fn()
    render(
      <Provider store={store}>
        <SNMPScan handleSNMPTimeoutInputOnChange={SNMPTimeoutInputOnChange} />
      </Provider>
    )
    const SNMPTimeoutInput = screen.getByTestId('isSNMPTime')
    fireEvent.change(SNMPTimeoutInput)
    expect(SNMPTimeoutInputOnChange).toHaveBeenCalledTimes(0)
  })
})
