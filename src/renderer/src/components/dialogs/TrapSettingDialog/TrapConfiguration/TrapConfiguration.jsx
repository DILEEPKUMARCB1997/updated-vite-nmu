/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import { Typography, Card, theme, Row, Col, Form, Input, InputNumber, Button, App } from 'antd'
import { startTask } from '../../../../features/trapSettingSlice'
import { useDispatch } from 'react-redux'

const TrapConfiguration = () => {
  const { notification } = App.useApp()
  const dispatch = useDispatch()
  const [trapServerIP, setTrapServerIP] = useState('')
  console.log(trapServerIP)
  const [trapServerPort, setTrapServerPort] = useState(162)
  console.log(trapServerPort)
  const [trapCommString, setTrapCommString] = useState('')
  console.log(trapCommString)

  const { useToken } = theme
  const { token } = useToken()

  const handleServerInputChange = (event) => {
    setTrapServerIP({ trapServerIP: event.target.value })
  }
  const handleServerPortChange = (event) => {
    if (event.target.value.length > 0) {
      if (event.target.value >= 1 && event.target.value <= 65535) {
        setTrapServerPort({ trapServerPort: event.target.value })
      }
    } else {
      setTrapServerPort({ trapServerPort: event.target.value })
    }
  }
  const handleCommInputChange = (event) => {
    setTrapCommString({ trapCommString: event.target.value })
  }

  const handleOnStartButton = () => {
    //console.log(this.state);
    if (ValidateIPaddress(trapServerIP)) {
      if (trapCommString !== '') {
        dispatch(startTask())
      } else {
        notification.error({ message: 'Ivalid trap server comm string' })
      }
    } else {
      notification.error({ message: 'Ivalid trap server ip address' })
    }
  }

  const ValidateIPaddress = (ipaddress) => {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipaddress
      )
    ) {
      return true
    }
    return false
  }
  return (
    <Card
      size="small"
      // style={{ width: '100%', height: '100%' }}
      bordered={false}
      // bodyStyle={{ padding: '5px' }}
      style={{
        height: '450px',
        borderRadius: '4px',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
      }}
    >
      <Typography.Title level={5} style={{ color: token.colorPrimary }}>
        Trap Configuration Field
      </Typography.Title>

      <Row justify="space-around" align="middle">
        <Col span={24}>
          <Form style={{ paddingTop: '20px' }}>
            <Form.Item style={{ width: '230px' }}>
              <Input
                status={trapServerIP === '' ? 'ServerIP is required' : ''}
                placeholder=" Trap Server IP"
                value={trapServerIP}
                onChange={handleServerInputChange}
              />
            </Form.Item>
            <Form.Item style={{ width: '230px' }}>
              <InputNumber
                status={trapServerPort === '' ? 'Server port is required' : ''}
                placeholder="Trap Server Port"
                style={{ width: '230px' }}
                value={trapServerPort}
                onChange={handleServerPortChange}
                controls
              />
            </Form.Item>
            <Form.Item style={{ width: '230px' }}>
              <Input
                status={trapCommString === '' ? 'Trap Comm string is required' : ''}
                placeholder="Trap Comm String"
                value={trapCommString}
                onChange={handleCommInputChange}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <div style={{ marginTop: '20px' }}>
        <Row justify="space-between" align="middle">
          <Col span={24}>
            <Button
              type="primary"
              onClick={handleOnStartButton}
              disabled={trapServerIP === '' || trapCommString === ''}
            >
              Start
            </Button>
          </Col>
        </Row>
      </div>
    </Card>
  )
}

export default TrapConfiguration
