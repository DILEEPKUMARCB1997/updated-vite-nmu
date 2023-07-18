/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react'
import { Select, Switch, Radio, Input, theme, Form, Divider, InputNumber } from 'antd'

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

const MailService = (props) => {
  const { serviceListSelectWidth } = props
  const { mailData, preService, validsData } = useSelector(mailSelector)
  const { isHostValid, isPortValid } = validsData
  const { isOpen, host, port, service } = mailData
  const { useToken } = theme
  const { token } = useToken()
  const [isServiceOther, setIsServiceOther] = useState(service === 'Other')
  const formRef = useRef()
  const dispatch = useDispatch()

  const handleMailOpenSwitchOnChange = () => {
    dispatch(setMailOpen())
  }

  const handleHostInputOnChange = (value) => {
    dispatch(setMailHost(value))
  }

  const handlePortInputOnChange = (value) => {
    dispatch(setMailPort(value))
  }

  const handleServiceListRadioOnChange = () => {
    setMailService(preService)
    setIsServiceOther(false)
  }

  const handleServiceSelectOnChange = (value) => {
    console.log(value)
    dispatch(setMailService(value))
  }

  const handleUserDefinitionRadioOnChange = () => {
    setMailService('Other')
    console.log('other')
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
      >
        {TITLE}
      </Divider>
      <Switch
        checked={isOpen}
        onChange={handleMailOpenSwitchOnChange}
        color="primary"
        style={{ marginRight: '10px' }}
      />
      <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black', marginRight: '10px' }}>
        {ENABLE_SWITCH_LABLE}
      </span>
      <div>
        <Radio
          style={{ marginTop: '20px', marginRight: '0px' }}
          checked={!isServiceOther}
          onChange={handleServiceListRadioOnChange}
        >
          <span
            style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black', marginRight: '10px' }}
          >
            {MAIL_SERVICE_LIST_RADIO_LABLE}
          </span>
        </Radio>
        <Select
          defaultValue="Gmail"
          style={{
            width: `${serviceListSelectWidth}px`,
            marginLeft: '20px',
            minWidth: '120px'
          }}
          disabled={isServiceOther}
          value={isServiceOther ? 'Other' : service}
          onChange={handleServiceSelectOnChange}
          options={[
            { value: 'FastMail', label: 'FastMail' },
            { value: 'GandiMail', label: 'GandiMail' },
            { value: 'Gmail', label: 'Gmail' },
            { value: 'Godaddy', label: 'Godaddy' },
            { value: 'GodaddyAsia', label: 'GodaddyAsia' },
            { value: 'GodaddyEurope', label: 'GodaddyEurope' },
            { value: 'hot.ee', label: 'hot.ee' },
            { value: 'Hotmail', label: 'Hotmail' },
            { value: 'iCloud', label: 'iCloud' },
            { value: 'mail.ee', label: 'mail.ee' },
            { value: 'Mail.ru', label: 'Mail.ru' },
            { value: 'Maildev', label: 'Maildev' },
            { value: 'Mailgun', label: 'Mailgun' },
            { value: 'Mailjet', label: 'Mailjet' },
            { value: 'Mailosaur', label: 'Mailosaur' },
            { value: 'Mandrill', label: 'Mandrill' },
            { value: 'Naver', label: 'Naver' },
            { value: 'OpenMailBox', label: 'OpenMailBox' },
            { value: 'Outlook365', label: 'Outlook365' },
            { value: 'Postmark', label: 'Postmark' },
            { value: 'QQ', label: 'QQ' },
            { value: 'QQex', label: 'QQex' },
            { value: 'SendCloud', label: 'SendCloud' },
            { value: 'SendGrid', label: 'SendGrid' },
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
        ></Select>
        <br />
        <Radio
          style={{ marginTop: '20px' }}
          value="Other"
          checked={isServiceOther}
          onChange={handleUserDefinitionRadioOnChange}
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
        <div style={{ marginLeft: '15px', display: 'inline-grid' }}>
          {isServiceOther && (
            <Form ref={formRef}>
              <Form.Item
                name="host"
                colon={false}
                style={{ marginTop: '30px', borderBottom: '1px dotted black' }}
                label={USER_DEFINITION_HOST_INPUT_LABLE}
                validateStatus={!isHostValid ? 'success' : 'error'}
              >
                <InputNumber
                  controls={false}
                  status={isServiceOther && !isHostValid ? null : 'error'}
                  bordered={false}
                  value={host}
                  onChange={handleHostInputOnChange}
                  disabled={!isServiceOther}
                />
              </Form.Item>
              <Form.Item
                style={{ borderBottom: '1px dotted black' }}
                colon={false}
                label={USER_DEFINITION_PORT_INPUT_LABLE}
                validateStatus={isPortValid ? 'success' : 'error'}
              >
                <InputNumber
                  controls={false}
                  status={isServiceOther && !isPortValid ? null : 'error'}
                  bordered={false}
                  value={port}
                  onChange={handlePortInputOnChange}
                  disabled={!isServiceOther}
                />
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  )
}

export default MailService
