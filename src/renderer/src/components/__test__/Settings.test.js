import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import Settings from '../dialogs/NetworkSettingsDialog/Settings/Settings'
import { store } from '../../app/store'

describe('Rendering settings component', () => {
  test('should render settings card', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <Settings />
      </Provider>
    )
    const card = screen.getByTestId('settingsCard')
    expect(card).toBeInTheDocument()
  })
  test('should render all Input field', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <Settings />
      </Provider>
    )
    const netmaskInput = screen.getByTitle('Netmask')
    fireEvent.click(netmaskInput)
    expect(netmaskInput).toBeInTheDocument()

    const gatewayInput = screen.getByTitle('Gateway')
    fireEvent.click(gatewayInput)
    expect(gatewayInput).toBeInTheDocument()

    const preferredDnsServerInput = screen.getByTitle('Preferred DNS server')
    fireEvent.click(preferredDnsServerInput)
    expect(preferredDnsServerInput).toBeInTheDocument()

    const alternateDnsServerInput = screen.getByTitle('Alternate DNS server')
    fireEvent.click(alternateDnsServerInput)
    expect(alternateDnsServerInput).toBeInTheDocument()

    const dhcpCheckbox = screen.getByRole('checkbox')
    fireEvent.click(dhcpCheckbox)
    expect(dhcpCheckbox).toBeInTheDocument()
    expect(dhcpCheckbox.checked).toEqual(true)
  })
})
