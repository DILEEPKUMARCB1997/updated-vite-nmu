/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Select, Switch, Radio, Form, Input, Card, Space } from 'antd'
//import { useState } from 'react'
import {
  mailSelector,
  setMailHost,
  setMailOpen,
  setMailPort,
  setMailService
} from '../../../../../features/Preferences/mailSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'

const { Option } = Select
const { TextField } = Input

const TITLE = 'Mail Service'
const ENABLE_SWITCH_LABLE = 'Enable Notification'
const MAIL_SERVICE_LIST_RADIO_LABLE = 'Mail Service List'
const USER_DEFINITION_RADIO_LABLE = 'User Definition'
const USER_DEFINITION_PORT_INPUT_LABLE = 'Port'
const USER_DEFINITION_HOST_INPUT_LABLE = 'Host'

const MailService = (props) => {
  const {
    isOpen,
    serviceListSelectWidth,
    service,
    serviceList,
    host,
    port,
    isHostValid,
    isPortValid
  } = props
  const dispatch = useDispatch()
  const { preService, validsData } = useSelector(mailSelector)
  console.log(preService)
  console.log(validsData)
  const mailRef = useRef()

  const handleMailOpenSwitchOnChange = () => {
    setMailOpen()
  }

  const handleHostInputOnChange = (event) => {
    dispatch(setMailHost(event.target.value))
  }

  const handlePortInputOnChange = (event) => {
    dispatch(setMailPort(event.target.value))
  }

  const handleServiceListRadioOnChange = () => {
    dispatch(setMailService(preService))
  }

  const handleServiceSelectOnChange = (value) => {
    dispatch(setMailService(value))
  }

  const handleUserDefinitionRadioOnChange = () => {
    dispatch(setMailService('Other'))
  }

  const isServiceOther = service === 'Other'
  return (
    <Card title={TITLE}>
      <Form.Item valuePropName="checked">
        <Switch checked={isOpen} onChange={handleMailOpenSwitchOnChange} color="primary" />
        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black', marginRight: '10px' }}>
          {ENABLE_SWITCH_LABLE}
        </span>
      </Form.Item>

      <div>
        <Space.Compact onChange={handleServiceListRadioOnChange} />
        <Radio color="primary" value={MAIL_SERVICE_LIST_RADIO_LABLE} />
        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black', marginRight: '10px' }}>
          {MAIL_SERVICE_LIST_RADIO_LABLE}
        </span>

        <Select
          style={{
            width: `${serviceListSelectWidth}px`,
            minWidth: '150px',
            position: 'relative',
            clear: 'both'
          }}
          disabled={isServiceOther}
          ref={(value) => {
            mailRef.serviceList = value
          }}
          value={service}
          dropdownStyle={{ zIndex: '1301' }}
          onChange={handleServiceSelectOnChange}
        >
          {serviceList &&
            serviceList.map((serviceItem) => (
              <Option key={serviceItem} value={serviceItem}>
                {serviceItem}
              </Option>
            ))}
        </Select>
      </div>
      <Form.Item
        checked={isServiceOther}
        value="Other"
        onChange={handleUserDefinitionRadioOnChange}
      >
        <Radio color="primary" value={{ USER_DEFINITION_RADIO_LABLE }} />
        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black', marginRight: '10px' }}>
          {USER_DEFINITION_RADIO_LABLE}
        </span>
      </Form.Item>
      <div style={{ marginLeft: '15px' }}>
        <Form.Item
          error={isServiceOther && !isHostValid}
          style={{ width: '200px', borderBottom: '1px dotted  black' }}
          disabled={!isServiceOther}
          value={host}
          onChange={handleHostInputOnChange}
        >
          <Input placeholder={USER_DEFINITION_HOST_INPUT_LABLE} bordered={false} />
        </Form.Item>

        <Form.Item
          // onError={isServiceOther && !isPortValid}
          // error={isServiceOther && !isPortValid}
          style={{ width: '200px', borderBottom: '1px dotted black' }}
          disabled={!isServiceOther}
          value={port}
          onChange={handlePortInputOnChange}
        >
          <Input placeholder={USER_DEFINITION_PORT_INPUT_LABLE} bordered={false} />
        </Form.Item>
      </div>
    </Card>
  )
}

export default MailService
