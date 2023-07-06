import React, { Component } from 'react'
import { Tag, Input, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { VisibilityOff, Visibility } from '@material-ui/icons'
import EnhanceSubContent from '../../EnhanceSubContent/EnhanceSubContent'
import styles from './MailSetting.scss'

const FormItem = Form.Item

const mailAccountTagData = [
  { id: 'to', label: 'To', color: 'magenta' },
  { id: 'cc', label: 'Cc', color: 'geekblue' },
  { id: 'bcc', label: 'Bcc', color: 'purple' }
]

const TITLE = 'Mail Settings'
const USERNAME_INPUT_LABLE = 'Mail Username'
const PASSWORD_INPUT_LABLE = 'Password'
const EMAIL_NOT_VALID_MSG = 'The input is not valid E-mail!'
const EMAIL_EMPTY_MSG = 'Please input your E-mail!'

class MailSetting extends Component {
  formRef = React.createRef()
  static propTypes = {
    isUsernameValid: PropTypes.bool.isRequired,
    isPasswordValid: PropTypes.bool.isRequired,
    // form: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    addMailAccount: PropTypes.func.isRequired,
    removeMailAccount: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
      inputVisible: {
        to: false,
        cc: false,
        bcc: false
      }
    }
  }

  handleUsernameInputOnChange = (event) => {
    this.props.setUsername(event.target.value)
  }

  handlePasswordInputOnChange = (event) => {
    this.props.setPassword(event.target.value)
  }

  handleShowPasswordOnClick = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }))
  }

  handlePasswordOnMouseDown = (event) => {
    event.preventDefault()
  }

  handleAddNewMailButtonOnClick = (id) => () => {
    this.setState((prevState) => ({
      inputVisible: {
        ...prevState.inputValue,
        [id]: true
      }
    }))
  }

  handleAddNewInputOnBlur = (id) => () => {
    this.setState((prevState) => ({
      inputVisible: {
        ...prevState.inputVisible,
        [id]: false
      }
    }))
  }

  handleAddNewInputPressEnter = (id) => (event) => {
    this.props.addMailAccount({
      id,
      value: event.email
    })
    this.setState({
      inputVisible: {
        ...this.state.inputVisible,
        [id]: false
      }
    })
  }

  handleRemoveTagButtonOnClick = (id, tag) => () => {
    this.props.removeMailAccount({ id, tag })
  }

  render() {
    const { isUsernameValid, username, isPasswordValid, password } = this.props
    const { showPassword, inputVisible } = this.state
    return (
      <EnhanceSubContent title={TITLE}>
        <TextField
          error={!isUsernameValid}
          className={styles.input}
          value={username}
          onChange={this.handleUsernameInputOnChange}
          label={USERNAME_INPUT_LABLE}
        />
        <TextField
          error={!isPasswordValid}
          className={styles.input}
          value={password}
          onChange={this.handlePasswordInputOnChange}
          label={PASSWORD_INPUT_LABLE}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={this.handleShowPasswordOnClick}
                  onMouseDown={this.handlePasswordOnMouseDown}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {mailAccountTagData.map((element) => (
          <div key={element.id} className={styles.container}>
            <span className={styles.label}>{`${element.label}:`}</span>
            {this.props[element.id].map((tag) => (
              <Tag
                color={element.color}
                key={tag}
                closable
                className={styles.tag}
                onClose={this.handleRemoveTagButtonOnClick(element.id, tag)}
              >
                {tag}
              </Tag>
            ))}
            {inputVisible[element.id] ? (
              <Form ref={this.formRef} onFinish={this.handleAddNewInputPressEnter(element.id)}>
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
                    className={styles.addTagInput}
                    onBlur={this.handleAddNewInputOnBlur(element.id)}
                  />
                </FormItem>
              </Form>
            ) : (
              <Tag
                className={classNames(styles.tag, styles.newTag)}
                color="#6FBBD6"
                onClick={this.handleAddNewMailButtonOnClick(element.id)}
              >
                <PlusOutlined /> New Mail
              </Tag>
            )}
          </div>
        ))}
      </EnhanceSubContent>
    )
  }
}

// const wrappedMailSetting = Form.create()(MailSetting);
export default MailSetting
