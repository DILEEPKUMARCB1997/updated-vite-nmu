/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import { Drawer, theme, Button, Typography, Checkbox, Form, Input, Alert } from 'antd'
import React, { useState } from 'react'
import {
  clearSingleNetworkSettingData,
  singleNetworkSettingSelector,
  setDHCP,
  setNetworkAddressData,
  setHostname
} from '../../../features/singleNetworkSettingSlice'
import { useDispatch, useSelector } from 'react-redux'

const networkSettingTips =
  'Please make sure device username password setting and SNMP community is correct.'

const SingleNetworkSettingDrawer = () => {
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()
  const {
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

  const handleCloseDrawer = () => {
    dispatch(clearSingleNetworkSettingData())
  }
  const handleDHCPCheckboxOnCheck = (event) => {
    dispatch(setDHCP({ isDHCP: event.target.checked }))
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
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        // closable={false}
        // destroyOnClose
        title={<span style={{ fontSize: '24px', color: token.colorPrimary }}>Network Setting</span>}
        placement="right"
        // open
        open={open}
        width={400}
        onClose={onClose}
        // onClose={handleCloseDrawer}
      >
        <Typography.Text>{`${model}(${MACAddress})`}</Typography.Text>
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
          <Form.Item label="IP Address" colon={false}>
            <Input
              status={!validIPAddress}
              disabled={isDHCP}
              value={IPAddress}
              onChange={handleNetworkAddressInputOnChange('IPAddress', validIPAddress)}
            />
          </Form.Item>
          <Form.Item label="Netmask" colon={false}>
            <Input
              status={!validNetmask}
              disabled={isDHCP}
              value={netmask}
              onChange={handleNetworkAddressInputOnChange('netmask', validNetmask)}
            />
          </Form.Item>
          <Form.Item label="Gateway" colon={false}>
            <Input
              status={!validGateway}
              disabled={isDHCP}
              value={gateway}
              onChange={handleNetworkAddressInputOnChange('gateway', validGateway)}
            />
          </Form.Item>

          <Form.Item label="Preferred DNS server" colon={false}>
            <Input
              status={!validDNS1}
              disabled={isDHCP}
              value={dns1}
              onChange={handleNetworkAddressInputOnChange('dns1', validDNS1)}
            />
          </Form.Item>
          <Form.Item label="Alternate DNS server" colon={false}>
            <Input
              status={!validDNS2}
              disabled={isDHCP}
              value={dns2}
              onChange={handleNetworkAddressInputOnChange('dns2', validDNS2)}
            />
          </Form.Item>
          <Form.Item label="Hostname" colon={false}>
            <Input value={hostname} onChange={handleHostnameInputOnChange} />
          </Form.Item>
        </Form>
        <Alert message={networkSettingTips} />
      </Drawer>
    </div>
  )
}

export default SingleNetworkSettingDrawer
