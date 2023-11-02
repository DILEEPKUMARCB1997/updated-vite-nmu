import React, { useEffect, useState } from 'react'
import { Card, theme, Row, Col, Form, Input, Button, App, Switch, Select, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { startTask } from '../../../../features/SyslogSettingSlice'

const SyslogConfiguration = () => {
  const { notification } = App.useApp()
  const dispatch = useDispatch()
  const [serverIP, setServerIP] = useState('')
  const [serverPort, setServerPort] = useState(514)
  const [logToFlash, setLogToFlash] = useState(1)
  const [logToServer, setLogToServer] = useState(1)
  const [logLevel, setLogLevel] = useState(7)

  const { useToken } = theme
  const { token } = useToken()
  useEffect(() => {
    return () => {
      dispatch(startTask())
    }
  }, [])

  const handleChangeLogToFlash = (value) => {
    if (value) {
      setLogToFlash(1)
    } else {
      setLogToFlash(2)
    }
  }
  const handleChangeLogToServer = (value) => {
    if (value) {
      setLogToServer(1)
    } else {
      setLogToServer(2)
    }
  }

  const handleLogLevelChange = (value) => {
    setLogLevel(value)
  }

  const handleServerInputChange = (event) => {
    const IPFormat =
      /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){1}$/
    const ipAddress = event.target.value
    if (ipAddress.match(IPFormat)) {
      setServerIP(event.target.value)
    } else {
      setServerIP(event.target.value)
    }
  }
  const handleServerPortChange = (event) => {
    if (event.target.value.length > 0) {
      if (event.target.value >= 1 && event.target.value <= 65535) {
        setServerPort(event.target.value)
      }
    } else {
      setServerPort(event.target.value)
    }
  }

  const handleOnStartButton = () => {
    if (ValidateIPaddress(serverIP)) {
      dispatch(startTask())
    } else {
      notification.error({ message: 'Invalid ip address' })
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
      title=" Syslog Configuration Field"
      size="small"
      bordered={false}
      style={{
        height: '480px',
        borderRadius: '4px',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
      }}
      headStyle={{ backgroundColor: token.colorPrimaryBorder }}
    >
      <Row justify="space-around" align="middle">
        <Col span={24}>
          <Form.Item
            labelAlign="start"
            label="logToFlash"
            colon={false}
            extra={<Switch checked={logToFlash === 1} onChange={handleChangeLogToFlash} />}
          ></Form.Item>
          <Form.Item
            labelAlign="start"
            label="logToServer"
            colon={false}
            extra={<Switch checked={logToServer === 1} onChange={handleChangeLogToServer} />}
          ></Form.Item>
          <Form.Item htmlFor="log-level">
            <Select
              value={logLevel}
              onChange={handleLogLevelChange}
              style={{ width: '230px', marginTop: '20px' }}
              options={[
                { label: '1:LOG EMERG', value: 1 },
                { label: '2:LOG_ALERT', value: 2 },
                { label: '3:LOG_CRIT', value: 3 },
                { label: '4:LOG_ERR', value: 4 },
                { label: '5:LOG_WARNING', value: 5 },
                { label: '6:LOG_NOTICE', value: 6 },
                { label: '7:LOG_INFO', value: 7 },
                { label: '8:LOG_DEBUG', value: 8 }
              ]}
            ></Select>
          </Form.Item>
          <Form>
            <Form.Item
              colon={false}
              name="Server Ip"
              rules={[
                {
                  required: true,
                  message: 'Server IP is required'
                }
              ]}
              style={{
                color: token.colorError,
                width: '230px',
                paddingTop: '10px'
              }}
            >
              <Input placeholder="Server IP" value={serverIP} onChange={handleServerInputChange} />
            </Form.Item>

            <Form.Item
              colon={false}
              help={
                <Typography style={{ color: 'red' }}>
                  {serverPort === '' ? 'Server port is required' : ''}
                </Typography>
              }
              style={{ color: token.colorError, width: '230px', paddingTop: '10px' }}
            >
              <Input
                value={serverPort}
                onChange={handleServerPortChange}
                placeholder="server Port"
                type="number"
                min="1"
                max="65535"
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <div style={{ marginTop: '20px' }}>
        <Row justify="space-between" align="middle">
          <Col span={24}>
            <Button type="primary" onClick={handleOnStartButton}>
              Start
            </Button>
          </Col>
        </Row>
      </div>
    </Card>
  )
}

export default SyslogConfiguration
