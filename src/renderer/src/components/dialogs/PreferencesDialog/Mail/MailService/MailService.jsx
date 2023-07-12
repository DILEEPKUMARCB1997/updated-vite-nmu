// /* eslint-disable react/prop-types */
// import React, { useState } from 'react'
// import { Radio, Input, Form, Card, Switch, Select } from 'antd'
// import {
//   // setMailHost,
//   setMailOpen,
//   setMailService
//   // setMailPassword,
//   // setMailPort
// } from '../../../../../features/Preferences/mailSlice'
// import { useDispatch } from 'react-redux'
// import { useRef } from 'react'
// const { Option } = Select
// const TITLE = 'Mail Service'
// const ENABLE_SWITCH_LABLE = 'Enable Notification'
// const MAIL_SERVICE_LIST_RADIO_LABLE = 'Mail Service List'
// const USER_DEFINITION_RADIO_LABLE = 'User Definition'
// const USER_DEFINITION_PORT_INPUT_LABLE = 'Port'
// const USER_DEFINITION_HOST_INPUT_LABLE = 'Host'

// const MailService = (props) => {
//   const { isOpen, serviceListSelectWidth, serviceList, preService } = props
//   const dispatch = useDispatch()
//   const [service, setService] = useState('gmail')
//   const [host, setHost] = useState('')
//   const [port, setPort] = useState('')
//   const mailRef = useRef()
//   const isServiceOther = service === 'other'
//   const isHostValid = host.length > 0
//   const isPortValid = port.length > 0

//   const handleServiceChange = (e) => {
//     setService(e.target.value)
//   }

//   const handleHostInputOnChange = (e) => {
//     setHost(e.target.value)
//   }

//   const handleUserDefinitionRadioOnChange = () => {
//     setMailService('Other')
//   }
//   const handlePortInputOnChange = (e) => {
//     setPort(e.target.value)
//   }
//   const handleMailOpenSwitchOnChange = () => {
//     dispatch(setMailOpen())
//   }
//   const handleServiceSelectOnChange = (value) => {
//     dispatch(setMailService(value))
//   }
//   const handleServiceListRadioOnChange = () => {
//     setMailService(preService)
//   }
//   return (
//     <Card title={TITLE}>
// <Form.Item valuePropName="checked">
//   <Switch checked={isOpen} onChange={handleMailOpenSwitchOnChange} color="primary" />
//   <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black', marginRight: '10px' }}>
//     {ENABLE_SWITCH_LABLE}
//   </span>
// </Form.Item>
//       <div>
//         <Radio.Group checked={!isServiceOther}>
//           <Radio value={MAIL_SERVICE_LIST_RADIO_LABLE} onChange={handleServiceListRadioOnChange}>
//             {MAIL_SERVICE_LIST_RADIO_LABLE}
//           </Radio>
// <Select
//   style={{
//     width: `${serviceListSelectWidth}px`
//   }}
//   disabled={isServiceOther}
//   ref={(value) => {
//     mailRef.serviceList = value
//   }}
//   value={service}
//   dropdownStyle={{ zIndex: '1301' }}
//   onChange={handleServiceSelectOnChange}
// >
//   {serviceList &&
//     serviceList.map((serviceItem) => (
//       <Option key={serviceItem} value={serviceItem}>
//         {serviceItem}
//       </Option>
//     ))}
// </Select>
//           <br />
//           <Radio value={USER_DEFINITION_RADIO_LABLE} onChange={handleUserDefinitionRadioOnChange}>
//             {USER_DEFINITION_RADIO_LABLE}
//           </Radio>
//         </Radio.Group>
//       </div>

//       <div>
//         <Form.Item
//           label={USER_DEFINITION_HOST_INPUT_LABLE}
//           validateStatus={isHostValid ? 'success' : 'error'}
//           help={isHostValid ? '' : 'Please enter a valid host'}
//           // validateFirst={isServiceOther && !isHostValid}
//         >
//           <Input
//             value={host}
//             onChange={handleHostInputOnChange}
//             disabled={!isHostValid && isServiceOther}
//           />
//         </Form.Item>
//         <Form.Item
//           label={USER_DEFINITION_PORT_INPUT_LABLE}
//           validateStatus={isPortValid ? 'success' : 'error'}
//           help={isPortValid ? '' : 'Please enter a valid port'}
//         >
//           <Input
//             value={port}
//             onChange={handlePortInputOnChange}
//             disabled={!isPortValid && isServiceOther}
//           />
//         </Form.Item>
//       </div>
//     </Card>
//   )
// }

// export default MailService

import React, { useRef, useState } from 'react'

import { Radio, Input, Form, Card, Switch, Select } from 'antd'
import { setMailService, setMailOpen } from '../../../../../features/Preferences/mailSlice'
const TITLE = 'Mail Service'
const ENABLE_SWITCH_LABLE = 'Enable Notification'
const MAIL_SERVICE_LIST_RADIO_LABLE = 'Mail Service List'
const USER_DEFINITION_RADIO_LABLE = 'User Definition'
const USER_DEFINITION_PORT_INPUT_LABLE = 'Port'
const USER_DEFINITION_HOST_INPUT_LABLE = 'Host'
const { Option } = Select
const MailService = ({ isOpen, serviceList, serviceListSelectWidth }) => {
  const mailRef = useRef()
  const [service, setService] = useState('gmail')
  const [host, setHost] = useState('')
  const [port, setPort] = useState('')

  const isServiceOther = service === 'other'
  const isHostValid = host.length > 0
  const isPortValid = port.length > 0

  const handleServiceChange = (e) => {
    setService(e.target.value)
  }

  const handleHostInputOnChange = (e) => {
    setHost(e.target.value)
  }

  const handlePortInputOnChange = (e) => {
    setPort(e.target.value)
  }

  const handleMailOpenSwitchOnChange = () => {
    setMailOpen()
  }
  const handleServiceSelectOnChange = (value) => {
    setMailService(value)
  }
  return (
    <Card title={TITLE} bordered={false} bodyStyle={{ width: '50%', height: '40vh' }}>
      <Switch checked={isOpen} onChange={handleMailOpenSwitchOnChange} />
      <span> {ENABLE_SWITCH_LABLE}</span>

      <br />
      <br />
      <Radio.Group onChange={handleServiceChange} value={service}>
        <Radio value={MAIL_SERVICE_LIST_RADIO_LABLE}>{MAIL_SERVICE_LIST_RADIO_LABLE}</Radio>
        <Select
          style={{
            width: `${serviceListSelectWidth}px`
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
        <br />
        <Radio value="other">Other</Radio>
      </Radio.Group>
      {isServiceOther && (
        <div>
          <Form.Item
            label={USER_DEFINITION_HOST_INPUT_LABLE}
            validateStatus={isHostValid ? 'success' : 'error'}
            help={isHostValid ? '' : 'Please enter a valid host'}
          >
            <Input value={host} onChange={handleHostInputOnChange} disabled={!isServiceOther} />
          </Form.Item>
          <Form.Item
            label={USER_DEFINITION_PORT_INPUT_LABLE}
            validateStatus={isPortValid ? 'success' : 'error'}
            help={isPortValid ? '' : 'Please enter a valid port'}
          >
            <Input value={port} onChange={handlePortInputOnChange} disabled={!isServiceOther} />
          </Form.Item>
        </div>
      )}
    </Card>
  )
}

export default MailService
