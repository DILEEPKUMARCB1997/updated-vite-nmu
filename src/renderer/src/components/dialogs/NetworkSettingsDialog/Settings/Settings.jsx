import { Card, Checkbox, Form, Input, theme } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  networkSettingSelector,
  setNetworkSettingAddress,
  setNetworkSettingDHCP,
  setNetworkSettingHostname
} from '../../../../features/networkSettingSlice'

const Settings = () => {
  const dispatch = useDispatch()
  const {
    status,
    isDHCP,
    netmask,
    gateway,
    hostname,
    dns1,
    dns2,
    validNetmask,
    validGateway,
    validDNS1,
    validDNS2
  } = useSelector(networkSettingSelector)
  const data = useSelector(networkSettingSelector)

  const { useToken } = theme
  const { token } = useToken()

  const inputData = [
    { label: 'Netmask', key: 'netmask', valid: 'validNetmask' },
    { label: 'Gateway', key: 'gateway', valid: 'validGateway' }
  ]

  const DNSInputData = [
    { label: 'Preferred DNS server', key: 'dns1', valid: 'validDNS1' },
    { label: 'Alternate DNS server', key: 'dns2', valid: 'validDNS2' }
  ]

  const handleDHCPCheckboxCheck = (e) => {
    // console.log(e.target.checked)
    dispatch(setNetworkSettingDHCP(e.target.checked))
  }

  const handleAddressInputChange = (key, valid) => (e) => {
    // console.log(key, valid, e.target.value)
    dispatch(setNetworkSettingAddress({ type: key, validType: valid, value: e.target.value }))
  }

  const handleHostnameInputChange = (e) => {
    dispatch(setNetworkSettingHostname(e.target.value))
  }

  return (
    <Card
      title="Network Setting"
      size="small"
      bordered={false}
      style={{
        height: '450px',
        borderRadius: '4px',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
      }}
      headStyle={{ backgroundColor: token.colorPrimaryBorder }}
    >
      <Checkbox
        disabled={status !== 'wait'}
        style={{ marginBottom: '10px' }}
        checked={isDHCP}
        onChange={handleDHCPCheckboxCheck}
      >
        DHCP
      </Checkbox>
      {inputData.map((input) => (
        // console.log('input', input),
        <Form.Item key={input.key} label={input.label} colon={false} style={{ margin: '5px' }}>
          <Input
            status={data[input.valid] ? null : 'error'}
            disabled={status !== 'wait' || isDHCP}
            value={data[input.key]}
            onChange={handleAddressInputChange(input.key, input.valid)}
          />
        </Form.Item>
      ))}

      {/* <Form.Item label="Gateway" colon={false} style={{ margin: '5px' }}>
        <Input
          status={!validGateway ? 'error' : null}
          disabled={status !== 'wait' || isDHCP}
          value={gateway}
          onChange={handleAddressInputChange('gateway', 'validGateway')}
        />
      </Form.Item> */}
      <Form.Item label="Hostname" colon={false} style={{ margin: '5px' }}>
        <Input disabled={status !== 'wait'} value={hostname} onChange={handleHostnameInputChange} />
      </Form.Item>
      {DNSInputData.map((input) => (
        <Form.Item key={input.key} label={input.label} colon={false} style={{ margin: '5px' }}>
          <Input
            status={data[input.valid] ? null : 'error'}
            disabled={status !== 'wait' || isDHCP}
            value={data[input.key]}
            onChange={handleAddressInputChange(input.key, input.valid)}
          />
        </Form.Item>
      ))}
      {/* <Form.Item label="Alternate DNS server" colon={false} style={{ margin: '5px' }}>
        <Input
          status={validDNS2 ? null : 'error'}
          disabled={status !== 'wait' || isDHCP}
          value={dns2}
          onChange={handleAddressInputChange('dns2', 'validDNS2')}
        />
      </Form.Item> */}
    </Card>
  )
}

export default Settings
