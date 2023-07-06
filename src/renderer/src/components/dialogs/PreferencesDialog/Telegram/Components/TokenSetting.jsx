import React from 'react'
import CustomInput from './CustomInput'
import ControlButton from './ControlButton'
import { Button, Col, Row, theme } from 'antd'

const TokenSetting = () => {
  const { useToken } = theme
  const { token } = useToken()
  return (
    <div>
      <Row gutter={[50, 18]}>
        <Col span={18}>
          <CustomInput label="Telegram Token" name="telegramToken" placeholder="Telegram Token" />
        </Col>
        <Col>
          <ControlButton text="Save Token" />
        </Col>
      </Row>
    </div>
  )
}

export default TokenSetting
