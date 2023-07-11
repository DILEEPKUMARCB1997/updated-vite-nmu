/* eslint-disable react/prop-types */
import { useRef, useState } from 'react'
import { Tag, Input, Form, Card, Button, Space } from 'antd'
import { PlusOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
// // import classNames from 'classnames'
// // import PropTypes from 'prop-types'
// //import { InputAdornment, IconButton } from '@material-ui/core'

import {
  addMailAccount,
  mailSelector,
  removeMailAccount,
  setMailPassword,
  setMailUsername
} from '../../../../../features/Preferences/mailSlice'
import { useDispatch, useSelector } from 'react-redux'

// import EnhanceSubContent from '../../EnhanceSubContent/EnhanceSubContent'
// import styles from './MailSetting.scss'

const FormItem = Form.Item

let mailAccountTagData = [
  { id: 'to', label: 'To', color: 'magenta' },
  { id: 'cc', label: 'Cc', color: 'geekblue' },
  { id: 'bcc', label: 'Bcc', color: 'purple' }
]

const TITLE = 'Mail Settings'
const USERNAME_INPUT_LABLE = 'Mail Username'
const PASSWORD_INPUT_LABLE = 'Password'
const EMAIL_NOT_VALID_MSG = 'The input is not valid E-mail!'
const EMAIL_EMPTY_MSG = 'Please input your E-mail!'

const MailSetting = (props) => {
  const dispatch = useDispatch()
  const { validsData } = useSelector(mailSelector)
  console.log(validsData)
  const formRef = useRef()
  const { isUsernameValid, username, isPasswordValid, password } = props
  const [showPassword, setShowPassword] = useState(false)
  const [inputVisible, setInputVisible] = useState({ to: false, cc: false, bcc: false })

  const handleUsernameInputOnChange = (event) => {
    dispatch(setMailUsername(event.target.value))
  }

  const handlePasswordInputOnChange = (event) => {
    dispatch(setMailPassword(event.target.value))
  }

  const handleShowPasswordOnClick = () => {
    setShowPassword(showPassword)
    // setState((state) => ({ showPassword: !state.showPassword }))
  }

  const handlePasswordOnMouseDown = (event) => {
    event.preventDefault()
  }

  const handleAddNewMailButtonOnClick = (id) => () => {
    setInputVisible((prevState) => ({
      ...prevState.inputValue,
      [id]: true
    }))
  }

  const handleAddNewInputOnBlur = (id) => () => {
    setInputVisible((prevState) => ({
      ...prevState.inputVisible,
      [id]: false
    }))
  }

  const handleAddNewInputPressEnter = (id) => (event) => {
    dispatch(
      addMailAccount({
        id,
        value: event.email
      })
    )
    setInputVisible({
      ...inputVisible,
      [id]: false
    })
  }

  const handleRemoveTagButtonOnClick = (id, tag) => () => {
    dispatch(removeMailAccount({ id, tag }))
  }

  // const { showPassword, inputVisible } = state
  return (
    <Card title={TITLE}>
      <FormItem
        error={!isUsernameValid}
        style={{ width: '200px' }}
        value={username}
        onChange={handleUsernameInputOnChange}
        //label={USERNAME_INPUT_LABLE}
      >
        <Input
          placeholder={USERNAME_INPUT_LABLE}
          bordered={false}
          style={{ borderBottom: '1px solid black' }}
        />
      </FormItem>
      <FormItem
        error={!isPasswordValid}
        style={{ width: '200px' }}
        value={password}
        onChange={handlePasswordInputOnChange}
        // label={PASSWORD_INPUT_LABLE}
        type={showPassword ? 'text' : 'password'}
        initialValue={{
          endAdornment: (
            <Space.Compact position="end">
              <Button onClick={handleShowPasswordOnClick} onMouseDown={handlePasswordOnMouseDown}>
                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </Button>
            </Space.Compact>
          )
        }}
      >
        {' '}
        <Input
          placeholder={PASSWORD_INPUT_LABLE}
          bordered={false}
          style={{ borderBottom: '1px solid black' }}
        />
      </FormItem>
      {mailAccountTagData &&
        mailAccountTagData.map((element) => (
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
                <FormItem
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
                </FormItem>
              </Form>
            ) : (
              <Tag
                style={{ fontSize: '1rem', borderStyle: 'dashed' }}
                // className={classNames(styles.tag, styles.newTag)}
                color="#6FBBD6"
                onClick={handleAddNewMailButtonOnClick(element.id)}
              >
                <PlusOutlined /> New Mail
              </Tag>
            )}
          </div>
        ))}
    </Card>
  )
}

// const wrappedMailSetting = Form.create()(MailSetting);
export default MailSetting

// import React, { useRef, useState } from 'react'
// import { Tag, Input, Form, Card, AutoComplete, InputNumber } from 'antd'
// import { EyeInvisibleOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
// import {
//   addMailAccount,
//   removeMailAccount,
//   setMailUsername,
//   setMailPassword
// } from '../../../../../features/Preferences/mailSlice'

// const mailAccountTagData = [
//   { id: 'to', label: 'To', color: 'magenta' },
//   { id: 'cc', label: 'Cc', color: 'geekblue' },
//   { id: 'bcc', label: 'Bcc', color: 'purple' }
// ]

// const TITLE = 'Mail Settings'
// const USERNAME_INPUT_LABLE = 'Mail Username'
// const PASSWORD_INPUT_LABLE = 'Password'
// const EMAIL_NOT_VALID_MSG = 'The input is not valid E-mail!'
// const EMAIL_EMPTY_MSG = 'Please input your E-mail!'

// const MailSetting = (props) => {
//   const { isUsernameValid, username, isPasswordValid, password } = props
//   const formRef = useRef()
//   const [showPassword, setShowPassword] = useState(false)
//   const [inputVisible, setInputVisible] = useState({
//     to: false,
//     cc: false,
//     bcc: false
//   })
//   // static propTypes = {
//   //   isUsernameValid: PropTypes.bool.isRequired,
//   //   isPasswordValid: PropTypes.bool.isRequired,
//   //   // form: PropTypes.object.isRequired,
//   //   username: PropTypes.string.isRequired,
//   //   password: PropTypes.string.isRequired,
//   //   addMailAccount: PropTypes.func.isRequired,
//   //   removeMailAccount: PropTypes.func.isRequired,
//   //   setUsername: PropTypes.func.isRequired,
//   //   setPassword: PropTypes.func.isRequired
//   // }

//   // constructor(props) {
//   //   super(props)
//   //   state = {
//   //     showPassword: false,
//   //     inputVisible: {
//   //       to: false,
//   //       cc: false,
//   //       bcc: false
//   //     }
//   //   }
//   // }

//   const handleUsernameInputOnChange = (event) => {
//     setMailUsername(event.target.value)
//   }

//   const handlePasswordInputOnChange = (event) => {
//     setMailPassword(event.target.value)
//   }

//   const handleShowPasswordOnClick = () => {
//     setShowPassword({ showPassword: !showPassword })
//   }

//   const handlePasswordOnMouseDown = (event) => {
//     event.preventDefault()
//   }

//   const handleAddNewMailButtonOnClick = (id) => () => {
//     setInputVisible((prevState) => ({
//       inputVisible: {
//         ...prevState.inputValue,
//         [id]: true
//       }
//     }))
//   }

//   const handleAddNewInputOnBlur = (id) => () => {
//     setInputVisible((prevState) => ({
//       inputVisible: {
//         ...prevState.inputVisible,
//         [id]: false
//       }
//     }))
//   }

//   const handleAddNewInputPressEnter = (id) => (event) => {
//     addMailAccount({
//       id,
//       value: event.email
//     })
//     setInputVisible({
//       inputVisible: {
//         ...inputVisible,
//         [id]: false
//       }
//     })
//   }

//   const handleRemoveTagButtonOnClick = (id, tag) => () => {
//     removeMailAccount({ id, tag })
//   }

//   // render() {
//   //   const { isUsernameValid, username, isPasswordValid, password } = props
//   //   const { showPassword, inputVisible } = state
//   return (
//     <Card title={TITLE}>
//       <AutoComplete
//         error={!isUsernameValid}
//         style={{ width: '200px' }}
//         value={username}
//         onChange={handleUsernameInputOnChange}
//         label={USERNAME_INPUT_LABLE}
//       />
//       <AutoComplete
//         error={!isPasswordValid}
//         style={{ width: '200px' }}
//         value={password}
//         onChange={handlePasswordInputOnChange}
//         label={PASSWORD_INPUT_LABLE}
//         type={showPassword ? 'text' : 'password'}
//         options={{
//           endAdornment: (
//             <InputNumber
//               addonAfter={showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
//               onClick={handleShowPasswordOnClick}
//               onMouseDown={handlePasswordOnMouseDown}
//             ></InputNumber>
//           )
//         }}
//       />
//       {mailAccountTagData.map((element) => (
//         <div key={element.id} style={{ marginTop: '30px' }}>
//           <span
//             style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black', marginRight: '10px' }}
//           >{`${element.label}:`}</span>
//           {[element.id].map((tag) => (
//             <Tag
//               color={element.color}
//               key={tag}
//               closable
//               style={{ fontSize: '1rem' }}
//               onClose={handleRemoveTagButtonOnClick(element.id, tag)}
//             >
//               {tag}
//             </Tag>
//           ))}
//           {inputVisible[element.id] ? (
//             <Form ref={formRef} onFinish={handleAddNewInputPressEnter(element.id)}>
//               <Form.Item
//                 name="email"
//                 rules={[
//                   {
//                     type: 'email',
//                     message: EMAIL_NOT_VALID_MSG
//                   },
//                   {
//                     required: true,
//                     message: EMAIL_EMPTY_MSG
//                   }
//                 ]}
//               >
//                 <Input
//                   autoFocus
//                   type="text"
//                   style={{ width: '200px' }}
//                   onBlur={handleAddNewInputOnBlur(element.id)}
//                 />
//               </Form.Item>
//             </Form>
//           ) : (
//             <Tag
//               style={{ fontSize: '1rem', borderStyle: 'dashed' }}
//               color="#6FBBD6"
//               onClick={handleAddNewMailButtonOnClick(element.id)}
//             >
//               <PlusOutlined /> New Mail
//             </Tag>
//           )}
//         </div>
//       ))}
//     </Card>
//   )
// }

// // const wrappedMailSetting = Form.create()(MailSetting);
// export default MailSetting
