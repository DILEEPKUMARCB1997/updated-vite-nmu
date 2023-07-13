import React, { useState } from 'react'
import { Radio, Input, Form, Divider, Switch, Select, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  mailSelector,
  setMailHost,
  setMailPort,
  setMailOpen,
  setMailService
} from '../../../../../features/Preferences/mailSlice'
import { useRef } from 'react'
const { Option } = Select

const ENABLE_SWITCH_LABLE = 'Enable Notification'
const MAIL_SERVICE_LIST_RADIO_LABLE = 'Mail Service List'
const USER_DEFINITION_RADIO_LABLE = 'User Definition'
const MailService = ({ serviceListSelectWidth }) => {
  const { useToken } = theme
  const { token } = useToken()
  const { preService, validsData, mailData } = useSelector(mailSelector)
  //console.log(preService, validsData)
  const { isHostValid, isPortValid } = validsData
  const { isOpen, serviceList, port, host, service } = mailData
  const [services, setServices] = useState('')

  const dispatch = useDispatch()
  const mailRef = useRef()
  const isServiceOther = services === 'other'

  const handleServiceChange = (e) => {
    setServices(e.target.value)
  }
  const handleHostInputOnChange = (e) => {
    dispatch(setMailHost(e.target.value))
  }

  const handlePortInputOnChange = (e) => {
    dispatch(setMailPort(e.target.value))
  }
  const handleMailOpenSwitchOnChange = () => {
    dispatch(setMailOpen())
  }
  const handleServiceSelectOnChange = (value) => {
    console.log(value)
    setMailService(value)
  }

  const handleServiceListRadioOnChange = () => {
    dispatch(setMailService(preService))
  }

  const handleUserDefinitionRadioOnChange = () => {
    dispatch(setMailService('Other'))
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
        Mail Service
      </Divider>
      <div>
        <Form.Item valuePropName="checked">
          <Switch checked={isOpen} onChange={handleMailOpenSwitchOnChange} color="primary" />
          <span
            style={{
              fontSize: '1rem',
              fontWeight: 'bold',
              color: 'black',
              marginRight: '10px',
              marginLeft: '10px'
            }}
          >
            {ENABLE_SWITCH_LABLE}
          </span>
        </Form.Item>
      </div>
      <Radio.Group value={services} onChange={handleServiceChange}>
        <Radio
          value="Gmail"
          onChange={handleServiceListRadioOnChange}
          style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            color: 'black',
            marginLeft: '10px',
            marginBottom: '20px'
          }}
        >
          {MAIL_SERVICE_LIST_RADIO_LABLE}
        </Radio>
        <Select
          style={{
            width: `${serviceListSelectWidth}px`,
            marginRight: '20px',
            minWidth: '120px'
          }}
          disabled={isServiceOther}
          ref={(value) => {
            mailRef.serviceList = value
          }}
          value={service}
          dropdownStyle={{ zIndex: '1301' }}
          onChange={handleServiceSelectOnChange}
          //  defaultValue="Gmail"
          options={[
            { value: '126', label: '126' },
            { value: '163', label: '163' },
            { value: '1und1', label: '1und1' },
            { value: 'AOL', label: 'AOL' },
            { value: 'DebugMail', label: 'DebugMail' },
            { value: 'DynectEmail', label: 'DynectEmail' },
            { value: 'SendinBlue', label: 'SendinBlue' },
            { value: 'SendPulse', label: 'SendPulse' },
            { value: 'SES', label: 'SES' },
            { value: 'SES-US-EAST-1', label: 'SES-US-EAST-1' },
            { value: 'SES-US-WEST-2', label: 'SES-US-WEST-2' },
            { value: 'SES-EU-WEST-1', label: 'SES-EU-WEST-1' },
            { value: 'Sparkpost', label: 'Sparkpost' },
            { value: 'Yahoo', label: 'Yahoo' },
            { value: 'Yandex', label: 'Yandex' },
            { value: 'Zoho', label: 'Zoho' },
            { value: 'qiye.aliyun', label: 'qiye.aliyun' }
          ]}
        />

        <br />
        <Radio
          value="other"
          onChange={handleUserDefinitionRadioOnChange}
          style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            color: 'black',
            marginLeft: '10px',
            marginBottom: '20px'
          }}
        >
          {USER_DEFINITION_RADIO_LABLE}
        </Radio>
      </Radio.Group>
      {isServiceOther && (
        <div>
          <Form.Item
            label="Host"
            colon={false}
            validateStatus={isHostValid ? 'success' : 'error'}
            help={isHostValid ? '' : 'Please enter a valid host'}
          >
            <Input
              bordered={false}
              style={{ width: '200px', borderBottom: '1px solid black' }}
              value={host}
              onChange={handleHostInputOnChange}
              disabled={!isServiceOther}
            />
          </Form.Item>
          <Form.Item
            label="Port"
            colon={false}
            validateStatus={isPortValid ? 'success' : 'error'}
            help={isPortValid ? '' : 'Please enter a valid port'}
          >
            <Input
              bordered={false}
              style={{ width: '200px', borderBottom: '1px solid black' }}
              value={port}
              onChange={handlePortInputOnChange}
              disabled={!isServiceOther}
            />
          </Form.Item>
        </div>
      )}
    </div>
  )
}

export default MailService
