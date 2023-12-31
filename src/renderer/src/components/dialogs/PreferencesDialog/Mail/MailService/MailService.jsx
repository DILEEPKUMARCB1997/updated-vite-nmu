/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react'
import { Select, Switch, Radio, theme, Form, Divider, InputNumber, Input } from 'antd'
import {
  mailSelector,
  setMailHost,
  setMailPort,
  setMailService,
  setMailOpen
} from '../../../../../features/Preferences/mailSlice'
import { useDispatch, useSelector } from 'react-redux'

const TITLE = 'Mail Service'
const ENABLE_SWITCH_LABLE = 'Enable Notification'
const MAIL_SERVICE_LIST_RADIO_LABLE = 'Mail Service List'
const USER_DEFINITION_RADIO_LABLE = 'User Definition'
const USER_DEFINITION_PORT_INPUT_LABLE = 'Port'
const USER_DEFINITION_HOST_INPUT_LABLE = 'Host'
const { Option } = Select
const MailService = () => {
  const { mailData, preService, validsData } = useSelector(mailSelector)
  const { isHostValid, isPortValid } = validsData
  const { isOpen, host, port, service, serviceList } = mailData
  const { useToken } = theme
  const { token } = useToken()
  const [isServiceOther, setIsServiceOther] = useState(service === 'Other')
  const formRef = useRef()
  const dispatch = useDispatch()

  let serviceListSelectWidth = 80
  serviceList?.forEach((element) => {
    const minWidth = element.length * 12
    if (minWidth > serviceListSelectWidth) {
      serviceListSelectWidth = minWidth
    }
  })

  const handleMailOpenSwitchOnChange = () => {
    dispatch(setMailOpen())
  }

  const handleHostInputOnChange = (event) => {
    //console.log(event)
    dispatch(setMailHost(event.target.value))
  }

  const handlePortInputOnChange = (event) => {
    console.log(event)
    dispatch(setMailPort(event.target.value))
  }

  const handleServiceListRadioOnChange = () => {
    dispatch(setMailService(preService))
    setIsServiceOther(false)
  }

  const handleServiceSelectOnChange = (value) => {
    console.log(value)
    dispatch(setMailService(value))
  }

  const handleUserDefinitionRadioOnChange = () => {
    dispatch(setMailService('Other'))
    //console.log('other')
    setIsServiceOther(true)
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
        data-testid="divider"
      >
        {TITLE}
      </Divider>
      <div style={{ marginLeft: '60px', alignItems: 'center' }}>
        <Switch
          checked={isOpen}
          onChange={handleMailOpenSwitchOnChange}
          color="primary"
          style={{ marginRight: '10px' }}
        />
        <span
          style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black', marginRight: '10px' }}
          aria-label="switchLabel"
        >
          {ENABLE_SWITCH_LABLE}
        </span>
        <div>
          <Radio
            style={{ marginTop: '20px', marginRight: '0px' }}
            checked={!isServiceOther}
            onChange={handleServiceListRadioOnChange}
            data-testid="serviceList"
          >
            <span
              style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black', marginRight: '10px' }}
            >
              {MAIL_SERVICE_LIST_RADIO_LABLE}
            </span>
          </Radio>
          <Select
            style={{
              width: `${serviceListSelectWidth}px`,
              marginLeft: '20px',
              minWidth: '120px'
            }}
            disabled={isServiceOther}
            value={isServiceOther ? 'Other' : service}
            onChange={handleServiceSelectOnChange}
          >
            {' '}
            {serviceList &&
              serviceList.map((serviceItem) => (
                <Option key={serviceItem} value={serviceItem}>
                  {serviceItem}
                </Option>
              ))}
          </Select>
          <br />
          <Radio
            style={{ marginTop: '20px' }}
            value="Other"
            checked={isServiceOther}
            onChange={handleUserDefinitionRadioOnChange}
            data-testid="userDefinition"
          >
            {' '}
            <span
              style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'black'
              }}
            >
              {USER_DEFINITION_RADIO_LABLE}
            </span>
          </Radio>

          <br />
          <div style={{ display: 'inline-grid' }}>
            <Form ref={formRef}>
              <Form.Item
                colon={false}
                style={{ marginTop: '30px' }}
                label={USER_DEFINITION_HOST_INPUT_LABLE}
              >
                <Input
                  status={isServiceOther && isHostValid ? null : 'error'}
                  value={host}
                  onChange={handleHostInputOnChange}
                  disabled={!isServiceOther}
                  data-testid="hostInput"
                />
              </Form.Item>

              <Form.Item colon={false} label={USER_DEFINITION_PORT_INPUT_LABLE}>
                <Input
                  controls={false}
                  style={{ width: '200px' }}
                  status={isServiceOther && isPortValid ? null : 'error'}
                  value={port}
                  onChange={handlePortInputOnChange}
                  disabled={!isServiceOther}
                  data-testid="portInput"
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MailService
