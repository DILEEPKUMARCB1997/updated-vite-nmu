/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import EnhanceSubContent from '../../EnhanceSubContent/EnhanceSubContent'
import { Button, Input, Space } from 'antd'
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'
import {
  setDefaultUsername,
  setDefaultPassword
  // advancedSelector
} from '../../../../features/Preferences/advancedSlice'
import { useDispatch, useSelector } from 'react-redux'

const TITLE = 'Device Default Setting'

const DeviceDefaultSetting = (props) => {
  const dispatch = useDispatch()
  // const { isDefaultPasswordValid, isDefaultUsernameValid, Def } = useSelector(advancedSelector)
  // const [showPassword, setShowPassword] = useState(false)

  const handleDefaultUsernameInputOnChange = (event) => {
    dispatch(setDefaultUsername(event.target.value))
  }

  const handleDefaultPasswordInputOnChange = (event) => {
    dispatch(setDefaultPassword(event.target.value))
  }

  // const handleShowPasswordOnClick = () => {
  //   setShowPassword((state) => ({ showPassword: !state.showPassword }))
  // }

  // const handlePasswordOnMouseDown = (event) => {
  //   event.preventDefault()
  // }
  return (
    <EnhanceSubContent title={TITLE}>
      <Input
        style={{ width: '200px' }}
        placeholder="Default Username"
        onChange={handleDefaultUsernameInputOnChange}
        // label={DEFAULT_USERNAME_INPUT_LABLE}
      ></Input>

      <Space direction="vertical">
        <Input.Password
          style={{ width: '200px' }}
          placeholder="Default Password"
          onChange={handleDefaultPasswordInputOnChange}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Space>
    </EnhanceSubContent>
  )
}

export default DeviceDefaultSetting
