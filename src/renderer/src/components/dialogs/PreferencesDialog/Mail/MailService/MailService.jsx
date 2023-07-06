/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Select, Switch, Radio, Form, Input, Card } from 'antd'
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
        <Form.Item onChange={handleServiceListRadioOnChange}>
          <Radio color="primary" />
          <span
            style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black', marginRight: '10px' }}
          >
            {MAIL_SERVICE_LIST_RADIO_LABLE}
          </span>
        </Form.Item>
        <Select
          style={{
            width: `${serviceListSelectWidth}px`,
            minWidth: '80px'
          }}
          disabled={isServiceOther}
          ref={(value) => {
            mailRef.serviceList = value
          }}
          value={service}
          dropdownStyle={{ zIndex: '1301' }}
          onChange={handleServiceSelectOnChange}
        >
          {Array.isArray(serviceList)
            ? serviceList.map((serviceItem) => {
                return (
                  <Option key={serviceList} value={serviceList}>
                    {serviceItem}
                  </Option>
                )
              })
            : null}
        </Select>
      </div>
      <Form.Item
        checked={isServiceOther}
        value="Other"
        onChange={handleUserDefinitionRadioOnChange}
      >
        <Radio color="primary" />
        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black', marginRight: '10px' }}>
          {USER_DEFINITION_RADIO_LABLE}
        </span>
      </Form.Item>
      <div style={{ marginLeft: '15px' }}>
        <Form.Item
          type="textfield"
          error={isServiceOther && !isHostValid}
          style={{ width: '200px' }}
          disabled={!isServiceOther}
          value={host}
          onChange={handleHostInputOnChange}
        >
          <Input placeholder={USER_DEFINITION_HOST_INPUT_LABLE} />
        </Form.Item>

        <Form.Item
          onError={isServiceOther && !isPortValid}
          // error={isServiceOther && !isPortValid}
          style={{ width: '200px' }}
          disabled={!isServiceOther}
          value={port}
          onChange={handlePortInputOnChange}
        >
          <Input placeholder={USER_DEFINITION_PORT_INPUT_LABLE} />
        </Form.Item>
      </div>
    </Card>
  )
}

export default MailService
