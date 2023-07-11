import { App, Button, Form, Input, InputNumber, Select, theme } from 'antd'
import React from 'react'
import NumberInput from './NumberInput'
import ControlButton from './ControlButton'
import { useDispatch } from 'react-redux'
import { saveTelegramUser } from '../../../../../features/Preferences/telegramSlice'

const TelegramForm = () => {
  const dispatch = useDispatch()
  const { useToken } = theme
  const { token } = useToken()
  const [form] = Form.useForm()

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(saveTelegramUser(values))
        console.log(values)
        form.resetFields()
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo)
      })
  }

  const handleReset = () => {
    form.resetFields()
  }

  return (
    <Form layout="vertical" form={form}>
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
        {/* <div style={{ display: 'flex', justifyContent: 'end', margin: '0px' }}> */}
        <ControlButton text="Submit" onClick={handleSubmit} />
        <ControlButton text="Reset" background={token.colorBorder} onClick={handleReset} />
        {/* </div> */}
      </Form.Item>
    </Form>
  )
}

export default TelegramForm
