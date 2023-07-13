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
  const { advancedData, validsData } = useSelector(advancedSelector)
  const { isDefaultUsernameValid, isDefaultPasswordValid } = validsData
  const { defaultUsername, defaultPassword } = advancedData

  const handleDefaultUsernameInputOnChange = (event) => {
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
          fontSize: '1.5rem',
          color: token.colorPrimary
        }}
      >
        Device Default Setting
      </Divider>

      <div style={{ marginLeft: '60px', alignItems: 'center' }}>
        <Form.Item colon={false} style={{ fontWeight: 'bold' }}>
          <Input
            bordered={false}
            status={isDefaultUsernameValid ? null : 'error'}
            style={{ width: '200px', borderBottom: '1px dotted black', fontSize: '15px' }}
            placeholder="Default Username"
            onChange={handleDefaultUsernameInputOnChange}
            defaultValue={defaultUsername}
          />
        </Form.Item>
        <Form.Item colon={false} style={{ fontWeight: 'bold' }}>
          <Input.Password
            bordered={false}
            status={isDefaultPasswordValid ? null : 'error'}
            style={{ width: '200px', borderBottom: '1px dotted black', fontSize: '15px' }}
            defaultValue={defaultPassword}
            placeholder="Default Password"
            onChange={handleDefaultPasswordInputOnChange}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default DeviceDefaultSetting
