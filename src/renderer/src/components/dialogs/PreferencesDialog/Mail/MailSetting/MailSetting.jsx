/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  addMailAccount,
  mailSelector,
  removeMailAccount,
  setMailPassword,
  setMailUsername
} from '../../../../../features/Preferences/mailSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Form, Tag, Divider, theme } from 'antd'
import { PlusOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
//import styles from './MailSetting.module.scss'

const USERNAME_INPUT_LABLE = 'Mail Username'
const PASSWORD_INPUT_LABLE = 'Password'
const EMAIL_NOT_VALID_MSG = 'The input is not valid E-mail!'
const EMAIL_EMPTY_MSG = 'Please input your E-mail!'

const mailAccountTagData = [
  { id: 'to', label: 'To', color: 'magenta' },
  { id: 'cc', label: 'Cc', color: 'geekblue' },
  { id: 'bcc', label: 'Bcc', color: 'purple' }
]

const MailSetting = () => {
  const { useToken } = theme
  const { token } = useToken()
  const [showPassword, setShowPassword] = useState(false)
  const [inputVisible, setInputVisible] = useState({ to: false, cc: false, bcc: false })
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { validsData } = useSelector(mailSelector)
  console.log(validsData)

  const handleUsernameInputOnChange = (e) => {
    dispatch(setMailUsername(e.target.value))
  }

  const handlePasswordInputOnChange = (e) => {
    //console.log(e)
    dispatch(setMailPassword(e.target.value))
  }

  //const handleShowPasswordOnClick = () => {
  //   dispatch(setShowPassword(!showPassword))
  // }

  // const handlePasswordOnMouseDown = (e) => {
  //   e.preventDefault()
  // }

  const handleRemoveTagButtonOnClick = (id, tag) => {
    console.log(`Remove tag ${tag} from ${id}`)
    removeMailAccount({ id, tag })
  }

  const handleAddNewMailButtonOnClick = (id) => {
    setInputVisible({ ...inputVisible, [id]: true })
    form.resetFields()
  }

  const handleAddNewInputPressEnter = (id) => async (event) => {
    //console.log(`Add new mail ${values.email} to ${id}`)
    setInputVisible({ ...inputVisible, [id]: false })
    dispatch(
      addMailAccount({
        id,
        value: event.email
      })
    )
  }

  const handleAddNewInputOnBlur = (id) => () => {
    setInputVisible({ ...inputVisible, [id]: false })
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
        Mail Settings
      </Divider>

      <Form.Item
        //error={!isUsernameValid}
        style={{ width: '200px', borderBottom: '1px solid black' }}
        onChange={handleUsernameInputOnChange}
      >
        <Input bordered={false} placeholder={USERNAME_INPUT_LABLE} />
      </Form.Item>
      <Input.Password
        bordered={false}
        // error={!isPasswordValid}
        style={{ width: '200px', borderBottom: '1px solid black' }}
        onChange={handlePasswordInputOnChange}
        placeholder={PASSWORD_INPUT_LABLE}
        type={showPassword ? 'text' : 'password'}
        iconRender={(showPassword) => (showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        //onClick={handleShowPasswordOnClick}
        // onMouseDown={handlePasswordOnMouseDown}
      />
      <br />
      <br />
      {mailAccountTagData.map((element) => (
        <div key={element.id} style={{ marginTop: '10px' }}>
          <span
            style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black', marginTop: '10px' }}
          >{`${element.label}:`}</span>
          {[element.id].map((tag) => (
            <Tag
              color={element.color}
              key={tag}
              closable
              style={{ fontSize: '1rem' }}
              onClose={handleRemoveTagButtonOnClick(element.id, tag)}
            >
              {tag}
            </Tag>
          ))}
          {inputVisible[element.id] ? (
            <Form form={form} onFinish={handleAddNewInputPressEnter(element.id)}>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: EMAIL_NOT_VALID_MSG
                  },
                  {
                    required: true,
                    message: EMAIL_EMPTY_MSG
                  }
                ]}
              >
                <Input
                  autoFocus
                  type="text"
                  style={{ width: '200px' }}
                  onBlur={handleAddNewInputOnBlur(element.id)}
                />
              </Form.Item>
            </Form>
          ) : (
            <Tag
              style={{ fontSize: '1rem', borderStyle: 'dashed' }}
              color="#6FBBD6"
              onClick={handleAddNewMailButtonOnClick(element.id)}
            >
              <PlusOutlined /> New Mail
            </Tag>
          )}
        </div>
      ))}
    </div>
  )
}

export default MailSetting
