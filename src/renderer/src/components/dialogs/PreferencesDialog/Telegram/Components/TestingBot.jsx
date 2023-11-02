/* eslint-disable no-unused-vars */
import { Col, Row } from 'antd'
import React from 'react'
import CustomInput from './CustomInput'
import ControlButton from './ControlButton'
import { REQUEST_SEND_TELEGRAM_MSG } from '../../../../../../../main/utils/IPCEvents'
import { useState } from 'react'

const TestingBot = () => {
  const [value, setValue] = useState('')

  const testTelegram = (param) => {
    //   console.log(param)
    window.electron.ipcRenderer.send(REQUEST_SEND_TELEGRAM_MSG, param)
  }

  const handleClickButton = () => {
    testTelegram(value)
    setValue('')
  }

  return (
    <div>
      <Row gutter={[50, 18]}>
        <Col span={18}>
          <CustomInput
            name="telegramToken"
            placeholder="Telegram Test Message"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Col>
        <Col>
          <ControlButton text="Send Message" onClick={handleClickButton} />
        </Col>
      </Row>
    </div>
  )
}

export default TestingBot
