import { Divider, Form, InputNumber, Switch, Typography, theme } from 'antd'
// eslint-disable-next-line no-unused-vars
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
import { CloseCircleOutlined } from '@ant-design/icons'

const SNMPScan = () => {
  const dispatch = useDispatch()
  const { SNMPData, validsData } = useSelector(snmpSelector)

  const { isEnable, SNMPPollInterval, SNMPTimeout, ICMPTimeout } = SNMPData
  const { isSNMPPollIntervalValid, isICMPTimeoutValid, isSNMPTimeoutValid } = validsData
  const { useToken } = theme
  const { token } = useToken()

  const handleEnableSNMPSwitchOnChange = (checked) => {
    dispatch(setEnableSNMP(checked))
  }

  const handleSNMPPollIntervalInputOnChange = (value) => {
    // console.log(value)
    dispatch(setSNMPPollInterval(value))
  }

  const handleICMPTimeoutInputOnChange = (value) => {
    //console.log(value)
    dispatch(setICMPTimeout(value))
  }

  const handleSNMPTimeoutInputOnChange = (value) => {
    // console.log(value)
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
        <Divider style={{ marginTop: '15px', marginBottom: '15px' }} data-testid="divider-comp" />
        <IPRangeList />
        <Divider style={{ marginTop: '15px', marginBottom: '15px' }} />
        <Form.Item
          colon={false}
          style={{ fontWeight: 'bolder' }}
          label="SNMP Polling Interval"
          rules={[
            {
              message: 'Wrong number'
            }
          ]}
        >
          <InputNumber
            style={{
              width: '200px',
              marginLeft: '10px'
            }}
            status={isSNMPPollIntervalValid ? null : 'error'}
            maxLength={2}
            prefix={isSNMPPollIntervalValid ? null : <CloseCircleOutlined />}
            addonAfter="min"
            controls={false}
            defaultValue={SNMPPollInterval}
            value={SNMPPollInterval}
            onChange={handleSNMPPollIntervalInputOnChange}
            data-testid="isSNMPPoll"
          />
        </Form.Item>
        <Form.Item colon={false} style={{ fontWeight: 'bold' }} label="ICMP Timeout">
          <InputNumber
            style={{ width: '200px', marginLeft: '65px' }}
            status={isICMPTimeoutValid ? null : 'error'}
            maxLength={4}
            addonAfter="ms"
            controls={false}
            defaultValue={ICMPTimeout}
            value={ICMPTimeout}
            onChange={handleICMPTimeoutInputOnChange}
            data-testid="isICMPTime"
          />
        </Form.Item>
        <Form.Item colon={false} style={{ fontWeight: 'bolder' }} label="SNMP Timeout">
          <InputNumber
            style={{ width: '200px', marginLeft: '60px' }}
            status={isSNMPTimeoutValid ? null : 'error'}
            coloraddonafter="red"
            maxLength={4}
            addonAfter="ms"
            controls={false}
            value={SNMPTimeout}
            defaultValue={SNMPTimeout}
            onChange={handleSNMPTimeoutInputOnChange}
            data-testid="isSNMPTime"
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default SNMPScan
