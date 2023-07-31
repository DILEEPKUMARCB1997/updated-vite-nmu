// /* eslint-disable no-unused-vars */
// import { Card, App, Row, Form, Switch, Input, Select, Button } from 'antd'

// import React, { useRef, useState } from 'react'

// const { Option } = Select

// const SyslogConfiguration = () => {
//   const { notification } = App.useApp()
//   const formRef = useRef()
//   const [server, setServer] = useState({
//     logToFlash: 1,
//     logLevel: 7,
//     logToServer: 1,
//     serverIP: '',
//     serverPort: 514
//   })

//   const handleChangeLogToFlash = (name) => (event) => {
//     if (event.target.checked) {
//       setServer({
//         [name]: 1
//       })
//     } else {
//       setServer({ [name]: 2 })
//     }
//   }

//   const handleLogLevelChange = (event) => {
//     setServer({ logLevel: event.target.value })
//   }

//   const ValidateIPaddress = (ipaddress) => {
//     if (
//       /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
//         ipaddress
//       )
//     ) {
//       return true
//     }
//     return false
//   }

//   const handleServerInputChange = (event) => {
//     const IPFormat =
//       /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){1}$/
//     const ipAddress = event.target.value
//     if (ipAddress.match(IPFormat)) {
//       setServer(event.target.value)
//     } else {
//       setServer(event.target.value)
//     }
//   }
//   const handleServerPortChange = (event) => {
//     if (event.target.value.length > 0) {
//       if (event.target.value >= 1 && event.target.value <= 65535) {
//         setServer(event.target.value)
//       }
//     } else {
//       setServer(event.target.value)
//     }
//   }

// const handleOnStartButton = () => {
//   //console.log(this.state);
//   if (ValidateIPaddress(server.serverIP)) {
//     // startTask
//   } else {
//     notification.error({ message: 'Invalid ip address' })
//   }
// }

//   return (
//     <div>
//       <Card
//         style={{ width: '65vh', height: '28rem', marginTop: '10px' }}
//         title="Syslog Configuration"
//         bordered={false}
//       >
//         <Row justify="space-around" align="middle">
//           <Form.Item label="Log To Flash" labelPlacement="start">
//             <Switch
//               checked={server.logToFlash === 1}
//               onChange={handleChangeLogToFlash('logToFlash')}
//               value="logToFlash"
//               type="primary"
//               // type="primary"
//             />
//           </Form.Item>
//           <Form.Item>
//             <Input placeholder="log-level" itemProp={{ name: 'age', id: 'log-level' }} />
//           </Form.Item>
//           <Form.Item>
//             <Select
//               value={server.logLevel}
//               onClick={() => handleLogLevelChange}
//               //prefixCls={{ name: 'age', id: 'log-level' }}
//               // defaultValue={{ name: 'age', id: 'log-level' }}
//             >
//               <Option value={0}>0: (LOG EMERG)</Option>
//               <Option value={1}>1: (LOG_ALERT)</Option>
//               <Option value={2}>2: (LOG_CRIT)</Option>
//               <Option value={3}>3: (LOG_ERR)</Option>
//               <Option value={4}>4: (LOG_WARNING)</Option>
//               <Option value={5}>5: (LOG_NOTICE)</Option>
//               <Option value={6}>6: (LOG_INFO)</Option>
//               <Option value={7}>7: (LOG_DEBUG)</Option>
//             </Select>
//           </Form.Item>
//           <Form ref={formRef}>
//             <Form.Item validateStatus={server.serverIP === ''}>
//               <Input
//                 label="Server IP"
//                 status={server.serverIP === ''}
//                 value={server.serverIP}
//                 onChange={handleServerInputChange}
//                 required
//                 helperText={server.serverIP === '' ? 'ServerIP is required' : ''}
//               />
//             </Form.Item>
//             <Form.Item help={server.serverPort === '' ? 'Server port is required' : ''}>
//               <Input
//                 label="Server Port"
//                 type="number"
//                 min="1"
//                 max="65535"
//                 error={server.serverPort === ''}
//                 value={server.serverPort}
//                 onChange={handleServerPortChange}
//                 required
//               />
//             </Form.Item>
//           </Form>
//         </Row>
//         <Row dir="row" justify="end" align="middle">
// <Button
//   // variant="contained"
//   type="primary"
//   //  className={styles.button_color}
//   onClick={handleOnStartButton}
// >
//   Start
// </Button>
//         </Row>
//       </Card>
//     </div>
//   )
// }

// export default SyslogConfiguration

import React, { useState } from 'react'
import { syslogSettingSelector } from '../../../../features/SyslogSettingSlice'
import { useSelector } from 'react-redux'
import { App, Button, Card, Form, Input, Row, Select, Switch } from 'antd'

const { Option } = Select
const SyslogConfiguration = () => {
  const { notification } = App.useApp()
  const { deviceStatus, isTaskRunning } = useSelector(syslogSettingSelector)
  console.log(deviceStatus)
  console.log(isTaskRunning)
  const [logToFlash, setLogToFlash] = useState(1)
  const [logToServer, setLogToServer] = useState(1)
  //const [logLevel, setLogLevel] = useState(0)
  const [server, setServer] = useState({
    // logToFlash: 1,
    logLevel: 7,
    //logToServer: 1,
    serverIP: '',
    serverPort: 514
  })

  const handleChangeLogToFlash = (name) => (event) => {
    if (event.target.checked) {
      setServer({
        [name]: 1
      })
    } else {
      setServer({ [name]: 2 })
    }
  }
  const handleLogLevelChange = (event) => {
    console.log(event)
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
  const handleServerInputChange = (event) => {
    const IPFormat =
      /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){1}$/
    const ipAddress = event.target.value
    if (ipAddress.match(IPFormat)) {
      setServer({ serverIP: event.target.value })
    } else {
      setServer({ serverIP: event.target.value })
    }
  }
  const handleServerPortChange = (event) => {
    if (event.target.value.length > 0) {
      if (event.target.value >= 1 && event.target.value <= 65535) {
        setServer({ serverPort: event.target.value })
      }
    } else {
      setServer({ serverPort: event.target.value })
    }
  }
  const handleOnStartButton = () => {
    if (ValidateIPaddress(server.serverIP)) {
      // startTask
    } else {
      notification.error({
        message: 'Invalid ip address'
      })
    }
  }
  return (
    <div>
      <Card
        title="Syslog Configuration Field"
        style={{ width: '70vh', height: '28rem', marginTop: '50px', marginRight: '80px' }}
      >
        <Row dir="row" justify="space-around" align="center">
          <Form.Item
            labelAlign="start"
            label="Log To Flash"
            extra={
              <Switch
                checked={logToFlash === 1}
                onChange={() => {
                  setLogToFlash('logToFlash')
                }}
              />
            }
          ></Form.Item>
          <Form.Item
            label="Log To Server"
            labelAlign="start"
            extra={
              <Switch
                checked={logToServer === 1}
                onChange={() => {
                  setLogToServer('logToServer')
                }}
              />
            }
          ></Form.Item>
          <Form>
            <Form.Item htmlFor="log-level" name="log-level">
              <Input />
            </Form.Item>
            <Select
              value={server.logLevel}
              onChange={handleLogLevelChange}
              style={{ marginBottom: '10px' }}
            >
              <Option value={0}>0: (LOG EMERG)</Option>
              <Option value={1}>1: (LOG_ALERT)</Option>
              <Option value={2}>2: (LOG_CRIT)</Option>
              <Option value={3}>3: (LOG_ERR)</Option>
              <Option value={4}>4: (LOG_WARNING)</Option>
              <Option value={5}>5: (LOG_NOTICE)</Option>
              <Option value={6}>6: (LOG_INFO)</Option>
              <Option value={7}>7: (LOG_DEBUG)</Option>
            </Select>
          </Form>
          <Form>
            <Form.Item
              colon={false}
              label="Server IP"
              validateStatus={server.serverIP === ''}
              help={server.serverIP === '' ? 'ServerIP is required' : ''}
            >
              <Input value={server.serverIP} onChange={handleServerInputChange} />
            </Form.Item>
            <Form.Item
              label="Server Port"
              colon={false}
              validateStatus={server.serverPort === ''}
              help={server.serverPort === '' ? 'Server port is required' : ''}
            >
              <Input
                value={server.serverPort}
                onChange={handleServerPortChange}
                type="number"
                min="1"
                max="65535"
              />
            </Form.Item>
          </Form>
        </Row>
        <Row dir="row" justify="space-around" align="middle">
          <Button
            // variant="contained"
            type="primary"
            //  className={styles.button_color}
            onClick={handleOnStartButton}
          >
            Start
          </Button>
        </Row>
      </Card>
    </div>
  )
}

export default SyslogConfiguration
