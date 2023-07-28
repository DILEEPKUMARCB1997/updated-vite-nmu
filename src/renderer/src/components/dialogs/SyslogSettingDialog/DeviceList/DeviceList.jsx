/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { ConfigProvider, Table, Typography, Row, Card } from 'antd'
import { useTheme } from 'antd-style'
import { useSelector } from 'react-redux'
import { syslogSettingSelector } from '../../../../features/SyslogSettingSlice'

const SUCCESS = 1
const ERROR = 2
const results = ['WAITING', 'SUCCESS', 'ERROR']
const DeviceList = () => {
  const { deviceStatus } = useSelector(syslogSettingSelector)
  console.log(deviceStatus)

  const columns = [
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model'
    },
    {
      title: 'IP Address',
      dataIndex: 'IPAddress',
      key: 'IPAddress'
    },
    {
      title: 'MAC Address',
      dataIndex: 'MACAddress',
      key: 'MACAddress'
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }
  ]

  //const data = [{ key: MACAddress, MACAddress, IPAddress, model }]

  const token = useTheme()

  return (
    <Card
      title="Devices"
      bordered={false}
      style={{ width: '70vh', height: '28rem', marginTop: '50px', marginLeft: '20px' }}
    >
      <ConfigProvider
        theme={{
          components: {
            Table: {
              colorFillAlter: token.colorPrimaryBg,
              fontSize: 14
            }
          }
        }}
      >
        <Table columns={columns} pagination={false}>
          <Typography.Paragraph>
            {Object.entries(deviceStatus).map(([MACAddress, element]) => (
              <Row key={MACAddress} style={{ backgroundColor: '#51d1e1' }}>
                <Typography.Text>{element.model}</Typography.Text>
                <Typography.Text>{MACAddress}</Typography.Text>
                <Typography.Text>{element.IPAddress}</Typography.Text>
                <Typography.Text
                  style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)', padding: '12px 8px' }}
                >
                  {element.status === SUCCESS && (
                    <span style={{ color: ' rgb(32, 173, 7)' }}>Success</span>
                  )}
                  {element.status === ERROR && <span style={{ color: 'red' }}>Error</span>}
                  {results[element.status]}
                </Typography.Text>
              </Row>
            ))}
          </Typography.Paragraph>
        </Table>
      </ConfigProvider>
    </Card>
  )
}

export default DeviceList
