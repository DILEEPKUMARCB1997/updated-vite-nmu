import { Divider, Form, Input, InputNumber, Switch, Typography, theme } from 'antd'
import React from 'react'
import IPRangeList from './IPRangeList/IPRangeList'
import { useDispatch, useSelector } from 'react-redux'
import {
  setEnableSNMP,
  setICMPTimeout,
  setSNMPPollInterval,
  setSNMPTimeout,
  snmpSelector
} from '../../../../../features/Preferences/snmpSlice'

const SNMPScan = () => {
  const dispatch = useDispatch()
  // const { SNMPData } = useSelector(snmpSelector)
  const data = useSelector(snmpSelector)
  console.log(data)
  const { isEnable, SNMPPollInterval, SNMPTimeout, ICMPTimeout } = data.SNMPData
  const { useToken } = theme
  const { token } = useToken()

  const handleEnableSNMPSwitchOnChange = (checked) => {
    dispatch(setEnableSNMP(checked))
  }

  const handleSNMPPollIntervalInputOnChange = (value) => {
    console.log(value)
    dispatch(setSNMPPollInterval(value))
  }

  const handleICMPTimeoutInputOnChange = (value) => {
    console.log(value)
    dispatch(setICMPTimeout(value))
  }

  const handleSNMPTimeoutInputOnChange = (value) => {
    console.log(value)
    dispatch(setSNMPTimeout(value))
  }

  return (
    <div>
      <Divider
        orientation="left"
        style={{
          marginBottom: '15px',
          marginTop: '15px',
          fontSize: '20px',
          color: token.colorPrimary,
          borderCollapse: 'true'
        }}
      >
        SNMP Scan
      </Divider>
      <div style={{ marginLeft: '60px', alignItems: 'center' }}>
        <div style={{ display: 'flex' }}>
          <Switch
            checked={isEnable}
            style={{ marginRight: '10px' }}
            onChange={handleEnableSNMPSwitchOnChange}
          />
          <Typography.Title style={{ marginBottom: '0px' }} level={5}>
            Enable
          </Typography.Title>
        </div>
        <Divider style={{ marginTop: '15px', marginBottom: '15px' }} />
        <IPRangeList />
        <Divider style={{ marginTop: '15px', marginBottom: '15px' }} />
        <Form.Item colon={false} style={{ fontWeight: 'bolder' }} label="SNMP Polling Interval">
          <InputNumber
            style={{ width: '200px', marginLeft: '10px' }}
            maxLength={2}
            addonAfter="min"
            controls={false}
            defaultValue={SNMPPollInterval}
            // value={SNMPPollInterval}
            onChange={handleSNMPPollIntervalInputOnChange}
          />
        </Form.Item>
        <Form.Item colon={false} style={{ fontWeight: 'bold' }} label="ICMP Timeout">
          <InputNumber
            style={{ width: '200px', marginLeft: '65px' }}
            maxLength={4}
            addonAfter="ms"
            controls={false}
            defaultValue={ICMPTimeout}
            // value={ICMPTimeout}
            onChange={handleICMPTimeoutInputOnChange}
          />
        </Form.Item>
        <Form.Item colon={false} style={{ fontWeight: 'bolder' }} label="SNMP Timeout">
          <InputNumber
            style={{ width: '200px', marginLeft: '60px' }}
            maxLength={4}
            addonAfter="ms"
            controls={false}
            // value={SNMPTimeout}s
            defaultValue={SNMPTimeout}
            onChange={handleSNMPTimeoutInputOnChange}
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default SNMPScan
