import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SingleNetworkSettingDrawer from './SingleNetworkSettingDrawer'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'

describe('NetworkSettingDrawer', () => {
  test('should render drawer', () => {
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const drawEl = screen.findByRole('Network Setting')
    expect(drawEl).toBeTruthy()
  })
  test('should render form', () => {
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const formEl = screen.findByRole('form')
    expect(formEl).toBeTruthy()
  })
  test('should close the drawer when cancel button is clicked', () => {
    const handleCloseDrawer = jest.fn()
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer onClose={handleCloseDrawer} />
      </Provider>
    )
    userEvent.click(screen.findByText('Cancel'))
    expect(handleCloseDrawer).toHaveBeenCalledTimes(0)
  })
  test('should close the drawer when apply button is clicked', () => {
    const handleCloseDrawer = jest.fn()
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer onClose={handleCloseDrawer} />{' '}
      </Provider>
    )
    userEvent.click(screen.findByText('Apply'))
    expect(handleCloseDrawer).toHaveBeenCalledTimes(0)
  })
  test('should disable DHCP when DHCP checkbox is unchecked', () => {
    const dhcpCheck = jest.fn()
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer drawerVisible={true} />
      </Provider>
    )
    const dhcpCheckbox = screen.findByLabelText('DHCP')
    userEvent.click(dhcpCheckbox)
    expect(dhcpCheck).toHaveBeenCalledTimes(0)
  })
  test('should render netmask', () => {
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const netMask = screen.findByLabelText('Netmask')
    expect(netMask).toBeTruthy()
  })
  test('should render gateWay', () => {
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const gateWay = screen.findByLabelText('Netmask')
    expect(gateWay).toBeDefined()
  })
  test('should render preferred DNS server', () => {
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const dnsEl = screen.findByLabelText('Preferred DNS server')
    expect(dnsEl).toBeDefined()
  })
  test('should render alternate DNS server', () => {
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const altDns = screen.findByLabelText('Alternate DNS server')
    expect(altDns).toBeTruthy()
  })
  test('should render hostname', () => {
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const host = screen.findByLabelText('Hostname')
    expect(host).toBeDefined()
  })
  test('should render alert', () => {
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const alert = screen.findByRole('alert')
    expect(alert).toBeTruthy()
  })
})
