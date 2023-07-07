import { Divider, Form, Input, InputNumber, Switch, Typography, theme } from 'antd'
import React from 'react'
import IPRangeList from './IPRangeList/IPRangeList'

const SNMPScan = () => {
  const { useToken } = theme
  const { token } = useToken()
  return (
    <div>
      <Divider
        orientation="left"
        style={{
          marginBottom: '15px',
          marginTop: '15px',
          fontSize: 'primary',
          color: token.colorPrimary
        }}
      >
        SNMP Scan
      </Divider>
      <div style={{ marginLeft: '60px', alignItems: 'center' }}>
        <div style={{ display: 'flex' }}>
          <Switch style={{ marginRight: '10px' }} />
          <Typography.Title level={5}>Enable</Typography.Title>
        </div>
        <Divider style={{ marginTop: '15px', marginBottom: '15px' }} />
        <IPRangeList />
        <Divider style={{ marginTop: '15px', marginBottom: '15px' }} />
        <Form.Item colon={false} style={{ fontWeight: 'bolder' }} label="SNMP Polling Interval">
          <InputNumber
            style={{ width: '150px', marginLeft: '10px' }}
            maxLength={2}
            addonAfter="min"
            controls={false}
            defaultValue={0}
          />
        </Form.Item>
        <Form.Item colon={false} style={{ fontWeight: 'bold' }} label="ICMP Timeout">
          <InputNumber
            style={{ width: '150px', marginLeft: '65px' }}
            maxLength={4}
            addonAfter="ms"
            controls={false}
          />
        </Form.Item>
        <Form.Item colon={false} style={{ fontWeight: 'bolder' }} label="SNMP Timeout">
          <InputNumber
            style={{ width: '150px', marginLeft: '60px' }}
            maxLength={4}
            addonAfter="ms"
            controls={false}
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default SNMPScan
