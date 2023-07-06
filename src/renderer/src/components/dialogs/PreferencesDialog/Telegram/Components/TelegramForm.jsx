import { Form, Input, InputNumber, Select, theme } from 'antd'
import React from 'react'
import NumberInput from './NumberInput'
import ControlButton from './ControlButton'

const TelegramForm = () => {
  const { useToken } = theme
  const { token } = useToken()
  return (
    <Form layout="vertical">
      {/* add user name */}
      <Form.Item
        name="telegramId"
        label="Telegram Id"
        rules={[
          {
            required: true,
            message: 'Please input the Telegram Id!'
          }
        ]}
      >
        {/* <Input disabled={isEdit} /> */}
        <InputNumber placeholder="Telegram Id" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="telegramName"
        label="Telegram Name"
        rules={[
          {
            required: true,
            message: 'Please input the Telegram Name!'
          }
        ]}
      >
        <Input placeholder="Telegram Name" />
      </Form.Item>
      {/* add select of role has admin, superuser, user */}
      <Form.Item
        name="telegramType"
        label="Telegram Type"
        // initialValue={editUserData.role}
        rules={[
          {
            required: true,
            message: 'Please select the Telegram Type!'
          }
        ]}
      >
        <Select
          placeholder="Select your Telegram Type"
          options={[
            { label: 'None' },
            { value: 'Private', label: 'Private' },
            { value: 'Group', label: 'Group' }
          ]}
        />
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'end', margin: '0px' }}>
        {/* <div style={{ marginLeft: '0px' }}> */}
        <ControlButton text="Submit" />
        <ControlButton text="Reset" background={token.colorBorder} />
        {/* </div> */}
      </Form.Item>
    </Form>
  )
}

export default TelegramForm
