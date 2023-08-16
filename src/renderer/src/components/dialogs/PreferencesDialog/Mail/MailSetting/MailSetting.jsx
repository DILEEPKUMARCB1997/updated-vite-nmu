/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import { Input, Form, Tag, Divider, theme } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone, PlusOutlined } from '@ant-design/icons'

import {
  addMailAccount,
  mailSelector,
  removeMailAccount,
  setMailPassword,
  setMailUsername
} from '../../../../../features/Preferences/mailSlice'
import { useDispatch, useSelector } from 'react-redux'
const EMAIL_NOT_VALID_MSG = 'The input is not valid E-mail!'
const EMAIL_EMPTY_MSG = 'Please input your E-mail!'
const USERNAME_INPUT_LABLE = 'Mail Username'
const PASSWORD_INPUT_LABLE = 'Password'
const mailAccountTagData = [
  { id: 'to', label: 'To', color: 'magenta' },
  { id: 'cc', label: 'Cc', color: 'geekblue' },
  { id: 'bcc', label: 'Bcc', color: 'purple' }
]

const MailSetting = () => {
  const { mailData } = useSelector(mailSelector)
  const { password, username } = mailData
  const [showPassword, setShowPassword] = useState(false)
  const [inputVisible, setInputVisible] = useState({
    to: false,
    cc: false,
    bcc: false
  })
  const dispatch = useDispatch()
  const formRef = useRef(null)
  const { useToken } = theme
  const { token } = useToken()

  const handleShowPasswordOnClick = () => {
    setShowPassword(!showPassword)
  }

  const handlePasswordInputOnChange = (event) => {
    dispatch(setMailPassword(event.target.value))
  }

  const handleRemoveTagButtonOnClick = (id, tag) => () => {
    console.log(tag)
    removeMailAccount(id, tag)
  }
  const handleUsernameInputOnChange = (event) => {
    dispatch(setMailUsername(event.target.value))
  }

  const handleAddNewInputPressEnter = (id) => (values) => {
    console.log(values)
    addMailAccount(id, values.email)
    setInputVisible({ ...inputVisible, [id]: false })
  }

  const handleAddNewInputOnBlur = (id) => () => {
    setInputVisible({ ...inputVisible, [id]: false })
  }

  const handleAddNewMailButtonOnClick = (id) => () => {
    console.log(id)
    setInputVisible({ ...inputVisible, [id]: true })
    setTimeout(() => {
      formRef.current.getFieldInstance('email')
    }, 10)
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
      <div style={{ marginLeft: '60px', alignItems: 'center' }}>
        <Form ref={formRef}>
          <Form.Item
            name="username"
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
              //  bordered={false}
              style={{ width: '200px' }}
              defaultValue={username}
              onChange={handleUsernameInputOnChange}
              placeholder={USERNAME_INPUT_LABLE}
            />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password
              //  bordered={false}
              style={{ width: '200px' }}
              defaultValue={password}
              onChange={handlePasswordInputOnChange}
              placeholder={PASSWORD_INPUT_LABLE}
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone onClick={handleShowPasswordOnClick} />
                ) : (
                  <EyeInvisibleOutlined />
                )
              }
            />
          </Form.Item>
        </Form>
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
              <Form ref={formRef} onFinish={handleAddNewInputPressEnter(element.id)}>
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
                style={{ fontSize: '1rem', color: 'black', background: token.colorPrimary }}
                onClick={handleAddNewMailButtonOnClick(element.id)}
              >
                <PlusOutlined /> New Mail
              </Tag>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MailSetting
