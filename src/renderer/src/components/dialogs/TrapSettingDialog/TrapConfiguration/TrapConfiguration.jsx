/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import { Typography, Card, theme, Row, Col, Form, Input, InputNumber, Button, App } from 'antd'
import { startTask } from '../../../../features/trapSettingSlice'
import { useDispatch } from 'react-redux'

const TrapConfiguration = () => {
  const { notification } = App.useApp()
  const dispatch = useDispatch()
  const [state, setState] = useState({ trapServerIP: '', trapServerPort: 162, trapCommString: '' })
  const { useToken } = theme
  const { token } = useToken()

  const handleServerInputChange = (event) => {
    setState({ ...state, trapServerIP: event.target.value })
  }
  const handleServerPortChange = (event) => {
    if (event.target.value.length > 0) {
      if (event.target.value >= 1 && event.target.value <= 65535) {
        setState({ ...state, trapServerPort: event.target.value })
      }
    } else {
      setState({ ...state, trapServerPort: event.target.value })
    }
  }
  const handleCommInputChange = (event) => {
    setState({ ...state, trapCommString: event.target.value })
  }

  const handleOnStartButton = () => {
    //console.log(this.state);
    if (ValidateIPaddress(state.trapServerIP)) {
      if (state.trapCommString !== '') {
        dispatch(startTask(state))
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
      title="Trap Configuration Field"
      bordered={false}
      style={{
        height: '450px',
        borderRadius: '4px',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
      }}
      headStyle={{ backgroundColor: token.colorPrimaryBorder }}
      data-testid="card"
    >
      <Row justify="space-around" align="middle">
        <Col span={24}>
          <Form style={{ paddingTop: '20px' }}>
            <Form.Item
              name="trapServerIP"
              style={{ width: '230px' }}
              // validateStatus={trapServerIP === ''}
              // help={trapServerIP === '' ? 'ServerIP is required' : ''}
              rules={[
                {
                  required: true,
                  message: 'ServerIP is required'
                }
              ]}
            >
              <Input
                // status={trapServerIP === '' ? 'ServerIP is required' : ''}
                placeholder=" Trap Server IP"
                value={state.trapServerIP}
                onChange={handleServerInputChange}
              />
            </Form.Item>
            <Form.Item
              colon={false}
              help={
                <Typography style={{ color: 'red' }}>
                  {state.trapServerPort === '' ? 'Server port is required' : ''}
                </Typography>
              }
              style={{ color: token.colorError, width: '230px', paddingTop: '10px' }}
            >
              <Input
                type="number"
                placeholder="Trap Server Port"
                style={{ width: '230px' }}
                value={state.trapServerPort}
                onChange={handleServerPortChange}
              />
            </Form.Item>
            <Form.Item
              name="trapCommString"
              style={{ width: '230px', paddingTop: '10px' }}
              rules={[
                {
                  required: true,
                  message: 'Trap Comm string is required'
                }
              ]}
              // validateStatus={trapCommString === ''}
              // help={trapCommString === '' ? 'Trap Comm string is required' : ''}
            >
              <Input
                // status={trapCommString === '' ? 'Trap Comm string is required' : ''}
                placeholder="Trap Comm String"
                value={state.trapCommString}
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
              disabled={state.trapServerIP === '' || state.trapCommString === ''}
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
