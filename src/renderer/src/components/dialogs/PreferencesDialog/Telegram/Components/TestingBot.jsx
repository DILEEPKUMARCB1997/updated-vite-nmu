import { Col, Row } from 'antd'
import React from 'react'
import CustomInput from './CustomInput'
import ControlButton from './ControlButton'

const TestingBot = () => {
  return (
    <div>
      <Row gutter={[50, 18]}>
        <Col span={18}>
          <CustomInput name="telegramToken" placeholder="Telegram Test Message" />
        </Col>
        <Col>
          <ControlButton text="Send Message" />
        </Col>
      </Row>
    </div>
  )
}

export default TestingBot
