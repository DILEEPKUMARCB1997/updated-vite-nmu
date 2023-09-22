/* eslint-disable no-unused-vars */
import React from 'react'
import CustomInput from './CustomInput'
import ControlButton from './ControlButton'
import { App, Col, Row, Typography } from 'antd'
import {
  saveTelegramToken,
  setTelegramToken,
  telegramSelector
} from '../../../../../features/Preferences/telegramSlice'
import { useDispatch, useSelector } from 'react-redux'

const TokenSetting = () => {
  const dispatch = useDispatch()
  const { Title, Text } = Typography
  const { savedTelegramToken, telegramToken } = useSelector(telegramSelector)
  const handleClickButton = () => {
    dispatch(saveTelegramToken())
  }

  return (
    <div>
      <Row gutter={[50, 18]}>
        <Col span={18}>
          <Title level={5}>
            Saved Token :{' '}
            <Text type="success">
              {savedTelegramToken !== '' ? (
                savedTelegramToken.substring(0, 11) + 'XXXXXXXXXXXXXXXXXXXXXXXXX'
              ) : (
                <Text type="danger">Token not added</Text>
              )}
            </Text>
          </Title>
        </Col>
        <Col span={18}>
          <CustomInput
            label="Telegram Token"
            name="telegramToken"
            placeholder="Telegram Token"
            value={telegramToken}
            onChange={(e) => dispatch(setTelegramToken(e.target.value))}
          />
        </Col>
        <Col>
          <ControlButton text="Save Token" onClick={handleClickButton} />
        </Col>
      </Row>
    </div>
  )
}

export default TokenSetting
