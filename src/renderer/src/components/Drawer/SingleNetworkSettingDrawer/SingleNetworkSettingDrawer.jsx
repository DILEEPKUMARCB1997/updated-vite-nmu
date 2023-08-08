/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import { Drawer, theme, Button, Typography, Checkbox, Form, Input, Alert, notification } from 'antd'
import React, { useState } from 'react'
import {
  clearSingleNetworkSettingData,
  singleNetworkSettingSelector,
  setDHCP,
  setNetworkAddressData,
  setHostname,
  requestSetNetworkSetting
} from '../../../features/singleNetworkSettingSlice'
import { useDispatch, useSelector } from 'react-redux'

const networkSettingTips =
  'Please make sure device username password setting and SNMP community is correct.'
const SNMPonlyInputItem = [
  { id: 'dns1', label: 'Preferred DNS server', valid: 'validDNS1' },
  { id: 'dns2', label: 'Alternate DNS server', valid: 'validDNS2' }
]
let enableApply
const SingleNetworkSettingDrawer = (props) => {
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()

  const {
    drawerVisible,
    model,
    MACAddress,
    isDHCP,
    IPAddress,
    validIPAddress,
    netmask,
    validNetmask,
    gateway,
    validGateway,
    isSNMPmode,
    dns1,
    dns2,
    validDNS1,
    validDNS2,
    hostname
  } = useSelector(singleNetworkSettingSelector)
  if (isSNMPmode) {
    enableApply = validIPAddress && validNetmask && validGateway && validDNS1 && validDNS2
  } else {
    enableApply = validIPAddress && validNetmask && validGateway
  }

  const handleCloseDrawer = () => {
    dispatch(clearSingleNetworkSettingData())
  }
  const handleDHCPCheckboxOnCheck = (event) => {
    dispatch(setDHCP({ isDHCP: event.target.checked }))
  }
  const handleApplyButtonOnClick = () => {
    dispatch(
      requestSetNetworkSetting((result, mag) => {
        const type = result ? 'success' : 'error'
        notification[type]({
          message: mag
        })
      })
    )
    handleCloseDrawer()
  }
  const handleNetworkAddressInputOnChange = (type, valid) => (event) => {
    dispatch(
      setNetworkAddressData({
        type,
        valid,
        text: event.target.value
      })
    )
  }
  const handleHostnameInputOnChange = (event) => {
    dispatch(setHostname({ hostname: event.target.value }))
  }
  return (
    <div>
      <Drawer
        open={drawerVisible}
        title={
          <Typography.Title level={4} style={{ color: token.colorPrimary }}>
            {' '}
            Network Setting
          </Typography.Title>
        }
        closable={false}
        maskClosable={false}
        onClose={handleCloseDrawer}
        destroyOnClose
        width={400}
        headerStyle={{ paddingBottom: '0px' }}
        bodyStyle={{ backgroundColor: token.colorBgLayout }}
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
              // disabled={!enableApply}
              onClick={handleApplyButtonOnClick}
            >
              Apply
            </Button>
          </div>
        }
      >
        <Typography style={{ marginBottom: '10px' }}>{`${model}(${MACAddress})`}</Typography>
        <Form layout="vertical">
          <Form.Item>
            <Checkbox
              style={{ paddingTop: '10px' }}
              checked={isDHCP}
              onChange={handleDHCPCheckboxOnCheck}
            >
              DHCP
            </Checkbox>
          </Form.Item>
          <Form.Item label="IP Address" colon={false} style={{ margin: '2px' }}>
            <Input
              status={!validIPAddress}
              disabled={isDHCP}
              value={IPAddress}
              onChange={handleNetworkAddressInputOnChange('IPAddress', validIPAddress)}
            />
          </Form.Item>
          <Form.Item label="Netmask" colon={false} style={{ margin: '2px' }}>
            <Input
              status={!validNetmask}
              disabled={isDHCP}
              value={netmask}
              onChange={handleNetworkAddressInputOnChange('netmask', validNetmask)}
            />
          </Form.Item>
          <Form.Item label="Gateway" colon={false} style={{ margin: '2px' }}>
            <Input
              status={!validGateway}
              disabled={isDHCP}
              value={gateway}
              onChange={handleNetworkAddressInputOnChange('gateway', validGateway)}
            />
          </Form.Item>
          {/* {isSNMPmode && ( */}
          {/* <> */}
          <Form.Item label="Preferred DNS server" colon={false} style={{ margin: '2px' }}>
            <Input
              status={!validDNS1}
              disabled={isDHCP}
              value={dns1}
              onChange={handleNetworkAddressInputOnChange('dns1', validDNS1)}
            />
          </Form.Item>
          <Form.Item label="Alternate DNS server" colon={false} style={{ margin: '2px' }}>
            <Input
              status={!validDNS2}
              disabled={isDHCP}
              value={dns2}
              onChange={handleNetworkAddressInputOnChange('dns2', validDNS2)}
            />
          </Form.Item>
          {/* </> */}
          {/* )} */}

          <Form.Item label="Hostname" colon={false} style={{ margin: '2px' }}>
            <Input value={hostname} onChange={handleHostnameInputOnChange} />
          </Form.Item>
        </Form>
        <Alert message={networkSettingTips} banner />
      </Drawer>
    </div>
  )
}

export default SingleNetworkSettingDrawer
