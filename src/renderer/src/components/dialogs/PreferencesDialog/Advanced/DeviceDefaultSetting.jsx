/* eslint-disable no-unused-vars */
import React from 'react'

import { Input, Divider, theme, Form } from 'antd'
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'
import {
  setDefaultUsername,
  setDefaultPassword,
  advancedSelector
} from '../../../../features/Preferences/advancedSlice'
import { useDispatch, useSelector } from 'react-redux'

const DeviceDefaultSetting = (props) => {
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()
  const { advancedData, validsData, isConfigChange } = useSelector(advancedSelector)
  // console.log(isConfigChange)
  const { isDefaultUsernameValid, isDefaultPasswordValid } = validsData
  const { defaultUsername, defaultPassword } = advancedData

  const handleDefaultUsernameInputOnChange = (event) => {
    console.log(event)
    dispatch(setDefaultUsername(event.target.value))
  }

  const handleDefaultPasswordInputOnChange = (event) => {
    console.log(event)
    dispatch(setDefaultPassword(event.target.value))
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
        Device Default Setting
      </Divider>

      <div style={{ marginLeft: '60px', alignItems: 'center' }}>
        <Form>
          <Form.Item
            initialValue={defaultUsername}
            name="defaultUsername"
            colon={false}
            style={{ fontWeight: 'bold' }}
            rules={[
              {
                required: true,
                message: 'Default Username'
              }
            ]}
          >
            <Input
              status={isDefaultUsernameValid ? null : 'error'}
              style={{ width: '200px', fontSize: '15px' }}
              placeholder="Default Username"
              onChange={handleDefaultUsernameInputOnChange}
            />
          </Form.Item>
          <Form.Item
            name="defaultPassword"
            colon={false}
            style={{ fontWeight: 'bold' }}
            rules={[
              {
                required: true,
                message: 'Default Password'
              }
            ]}
            initialValue={defaultPassword}
          >
            <Input.Password
              status={isDefaultPasswordValid ? null : 'error'}
              style={{ width: '200px', fontSize: '15px' }}
              placeholder="Default Password"
              onChange={handleDefaultPasswordInputOnChange}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default DeviceDefaultSetting
