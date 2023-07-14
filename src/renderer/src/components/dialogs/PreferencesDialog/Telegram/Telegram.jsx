/* eslint-disable no-unused-vars */
import { Card, Col, Row, theme } from 'antd'
import React from 'react'
import TokenSetting from './Components/TokenSetting'
import TestingBot from './Components/TestingBot'
import TelegramForm from './Components/TelegramForm'
import TelegramUserList from './Components/TelegramUserList'

const Telegram = () => {
  const { useToken } = theme
  const { token } = useToken()
  return (
    // <div style={{ marginTop: '10px' }}>
    // <Card bordered={true} className="elevation">
    <Row gutter={[18, 18]}>
      <Col span={24}>
        <Row gutter={[28, 28]}>
          <Col span={24}>
            <Card bordered={true} className="elevation">
              <div
                className="card_Header_left"
                style={{ background: token.colorPrimary, marginBottom: '0px' }}
              >
                <h3 className="heading">Telegram Token Setting</h3>
              </div>
              <br />
              <TokenSetting />
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={true} className="elevation">
              <div
                className="card_Header_left"
                style={{ background: token.colorPrimary, marginBottom: '0px' }}
              >
                <h3 className="heading">Telegram Bot Testing</h3>
              </div>
              <br />
              <TestingBot />
            </Card>
          </Col>
          <Col span={10}>
            <Card bordered={true} className="elevation" bodyStyle={{ paddingBottom: '5px' }}>
              <div
                className="card_Header_left"
                style={{ background: token.colorPrimary, marginBottom: '0px' }}
              >
                <h3 className="heading">Telegram Users Setting</h3>
              </div>
              <br />
              <TelegramForm />
            </Card>
          </Col>
          <Col span={14}>
            <Card bordered={true} className="elevation" bodyStyle={{ paddingBottom: '0px' }}>
              <div
                className="card_Header_left"
                style={{ background: token.colorPrimary, marginBottom: '0px' }}
              >
                <h3 className="heading">Telegram Users List</h3>
              </div>
              <br />
              <TelegramUserList />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
    // </Card>
    // </div>
  )
}

export default Telegram
