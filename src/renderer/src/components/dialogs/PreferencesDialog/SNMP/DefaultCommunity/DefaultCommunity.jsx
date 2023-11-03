// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setReadCommunity,
  setSNMPVersion,
  setWriteCommunity,
  snmpSelector
} from '../../../../../features/Preferences/snmpSlice'
import { Divider, Form, Input, Select, theme } from 'antd'

const DefaultCommunity = () => {
  const dispatch = useDispatch()
  const { useToken } = theme
  const { token } = useToken()
  const { SNMPData, validsData } = useSelector(snmpSelector)
  const { readCommunity, writeCommunity, version } = SNMPData
  //console.log(SNMPData)
  const { isReadCommunityValid, isWriteCommunityValid } = validsData

  const handleSNMPVersionSelectOnChange = (value) => {
    // console.log(value)
    dispatch(setSNMPVersion(value))
  }

  const handleWriteCommuityInputOnChange = (e) => {
    dispatch(setWriteCommunity(e.target.value))
  }

  const handleReadCommuityInputOnChange = (e) => {
    dispatch(setReadCommunity(e.target.value))
  }

  return (
    <div>
      <Divider
        orientation="left"
        style={{
          marginBottom: '15px',
          marginTop: '15px',
          fontSize: '20px',
          color: token.colorPrimary
        }}
      >
        Default Community
      </Divider>
      <div style={{ marginLeft: '60px', alignItems: 'center' }}>
        <Form.Item label="SNMP Version" colon={false} style={{ fontWeight: 'bolder' }}>
          <Select
            style={{ width: '200px', marginLeft: '65px' }}
            // defaultValue={version}
            value={version}
            options={[
              { value: 'v1', label: 'V1' },
              { value: 'v2c', label: 'V2C' }
            ]}
            onChange={handleSNMPVersionSelectOnChange}
          />
        </Form.Item>
        <Form.Item colon={false} style={{ fontWeight: 'bold' }} label="Read Community">
          <Input
            // status="error"
            status={isReadCommunityValid ? null : 'error'}
            style={{ width: '200px', marginLeft: '45px' }}
            defaultValue={readCommunity}
            value={readCommunity}
            onChange={handleReadCommuityInputOnChange}
          />
        </Form.Item>
        <Form.Item colon={false} style={{ fontWeight: 'bold' }} label="Write Community">
          <Input
            // status="error"
            status={isWriteCommunityValid ? null : 'error'}
            style={{ width: '200px', marginLeft: '40px' }}
            defaultValue={writeCommunity}
            value={writeCommunity}
            onChange={handleWriteCommuityInputOnChange}
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default DefaultCommunity
