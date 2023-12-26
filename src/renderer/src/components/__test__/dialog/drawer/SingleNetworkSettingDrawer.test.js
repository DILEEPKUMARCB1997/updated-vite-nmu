import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import SingleNetworkSettingDrawer from '../../../Drawer/SingleNetworkSettingDrawer/SingleNetworkSettingDrawer'
import { store } from '../../../../app/store'
import {
  Drawer,
  handleApplyButtonOnClick,
  handleCloseDrawer,
  drawerVisible
} from '../../../Drawer/SingleNetworkSettingDrawer/SingleNetworkSettingDrawer'
import { Typography, Button } from 'antd'

describe('SingleNetworkSettingDrawer', () => {
  test('should render div tag', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const drawer = screen.getByTestId('drawer')
    expect(drawer).toBeDefined()
  })
})

describe.skip('SingleNetworkSettingDrawer', () => {
  test('should render drawer', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer
          drawer={
            <Drawer
              data-testid="drawer-content"
              open={drawerVisible}
              title={
                <Typography.Title
                  level={4}
                  // style={{ color: token.colorPrimary }}
                >
                  {' '}
                  Network Setting
                </Typography.Title>
              }
              closable={false}
              maskClosable={false}
              onClose={handleCloseDrawer}
              destroyOnClose
              width={400}
              //headerStyle={{ backgroundColor: token.colorPrimaryBgHover, paddingBottom: '0px' }}
              // bodyStyle={{ backgroundColor: token.colorBgLayout }}
              footer={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Button style={{ marginRight: '10px' }} onClick={handleCloseDrawer}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleApplyButtonOnClick}
                    // disabled={!enableApply}
                  >
                    Apply
                  </Button>
                </div>
              }
            />
          }
        />
      </Provider>
    )
    expect(screen.getByTitle('Network Setting')).toBeInTheDocument()
  })
  test('should render form', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const form = screen.getByTestId('form')
    expect(form).toBeDefined()
  })
  test('should render checkbox', () => {
    const handleCheckboxOnChange = jest.fn()
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const checkbox = screen.getByRole('checkbox', { name: 'DHCP' })
    fireEvent.change(checkbox)
    expect(handleCheckboxOnChange).toHaveBeenCalledTimes(0)
  })
  test('should render input ip', () => {
    const handleNetworkAddressInputOnChange = jest.fn()
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const input = screen.getByLabelText('IPAddress')
    fireEvent.change(input)
    expect(handleNetworkAddressInputOnChange).toHaveBeenCalledTimes(0)
  })
  test('should render netMask', () => {
    const handleNetworkAddressInputOnChange = jest.fn()
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const netmask = screen.getByLabelText('Netmask')
    fireEvent.change(netmask)
    expect(handleNetworkAddressInputOnChange).toBeCalledTimes(0)
  })
  test('should render gateway', () => {
    const handleNetworkAddressInputOnChange = jest.fn()
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const gateway = screen.getByLabelText('Gateway')
    fireEvent.change(gateway)
    expect(handleNetworkAddressInputOnChange).toBeCalledTimes(0)
  })

  test('should render hostname', () => {
    const handleNetworkAddressInputOnChange = jest.fn()
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const hostname = screen.getByLabelText('Hostname')
    fireEvent.change(hostname)
    expect(handleNetworkAddressInputOnChange).toBeCalledTimes(0)
  })

  test('should render alert message', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SingleNetworkSettingDrawer />
      </Provider>
    )
    const alert = screen.getByText(
      'Please make sure device username password setting and SNMP community is correct.'
    )
    expect(alert).toBeDefined()
  })
})
