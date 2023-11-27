import { Divider, Form, Input, Select, theme } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deviceAdvanceSettingSelector,
  setDeviceAuthenticationData,
  setDeviceSNMPCommunity,
  setDeviceSNMPVersion
} from '../../../../features/deviceAdvanceSettingSlice'

const Authentication = () => {
  const { SNMPVersion, readCommunity, writeCommunity, username, password } = useSelector(
    deviceAdvanceSettingSelector
  )

  const dispatch = useDispatch()
  const { useToken } = theme
  const { token } = useToken()

  const handleAuthenticationSettingInputChange = (type) => (e) => {
    dispatch(setDeviceAuthenticationData({ type, value: e.target.value }))
  }

  const handleSnmpSettingInputChange = (type) => (e) => {
    dispatch(setDeviceSNMPCommunity({ type, value: e.target.value }))
  }

  const handleSNMPVersionSelectChange = (value) => {
    dispatch(setDeviceSNMPVersion(value))
  }

  return (
    <div>
      <Divider
        orientation="left"
        style={{
          marginTop: '0px',
          marginBottom: '0px',
          color: token.colorPrimary,
          borderCollapse: 'true'
        }}
      >
        General
      </Divider>
      <Form layout="vertical">
        <Form.Item label="Username" colon={false} style={{ margin: '5px' }}>
          <Input value={username} onChange={handleAuthenticationSettingInputChange('username')} />
        </Form.Item>
        <Form.Item label="Password" colon={false} style={{ margin: '5px' }}>
          <Input.Password
            value={password}
            onChange={handleAuthenticationSettingInputChange('password')}
          />
        </Form.Item>
      </Form>
      <Divider
        orientation="left"
        style={{
          marginBottom: '0px',
          color: token.colorPrimary,
          borderCollapse: 'true'
        }}
      >
        SNMP
      </Divider>
      <Form layout="vertical">
        <Form.Item label="SNMP Version" colon={false} style={{ fontWeight: 'bold', margin: '5px' }}>
          <Select
            // defaultValue={SNMPVersion}
            value={SNMPVersion}
            options={[
              { value: 'v1', label: 'V1' },
              { value: 'v2c', label: 'V2C' }
            ]}
            onChange={handleSNMPVersionSelectChange}
          />
        </Form.Item>
        <Form.Item colon={false} label="Read Community" style={{ margin: '5px' }}>
          <Input value={readCommunity} onChange={handleSnmpSettingInputChange('readCommunity')} />
        </Form.Item>
        <Form.Item colon={false} label="Write Community" style={{ margin: '5px' }}>
          <Input value={writeCommunity} onChange={handleSnmpSettingInputChange('writeCommunity')} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Authentication
