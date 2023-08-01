/* eslint-disable no-unused-vars */
import React from 'react'
import { ConfigProvider, Card, Typography, Table, theme } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { trapSettingSelector } from '../../../../features/trapSettingSlice'
import { useSelector } from 'react-redux'

const SUCCESS = 1
const ERROR = 2
const results = ['WAITING', 'SUCCESS', 'ERROR']
const columns = [
  {
    title: 'Modal',
    dataIndex: 'modal',
    key: 'modal',
    sorter: (a, b) => a.modal - b.modal,
    render: (element) => {
      {
        element.modal
      }
    }
  },
  {
    title: 'MAC Address',
    dataIndex: 'MACAddress',
    key: 'MACAddress',
    sorter: (a, b) => a.MACAddress - b.MACAddress,
    render: (element) => {
      {
        element.MACAddress
      }
    }
  },
  {
    title: 'IP Address',
    dataIndex: 'IPAddress',
    key: 'IPAddress',
    sorter: (a, b) => a.IPAddress - b.IPAddress,
    render: (element) => {
      {
        element.IPAddress
      }
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (element) =>
      element ? (
        <CheckOutlined style={{ color: '#49aa19' }} />
      ) : (
        <CloseOutlined style={{ color: 'red' }} />
      )
  }
]
const DeviceList = () => {
  const { isTaskRunning, deviceStatus } = useSelector(trapSettingSelector)

  const { useToken } = theme
  const { token } = useToken()
  return (
    <ConfigProvider
      theme={{
        inherit: true,
        components: {
          Table: {
            colorFillAlter: token.colorPrimaryBg,
            fontSize: 14
          }
        }
      }}
    >
      <Card
        size="small"
        // style={{ width: '100%', height: '100%' }}
        bordered={false}
        style={{
          height: '450px',
          borderRadius: '4px',
          boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
        }}
        // bodyStyle={{ padding: '5px' }}
      >
        <Typography.Title level={5} style={{ color: token.colorPrimary }}>
          Devices
        </Typography.Title>
        <div style={{ height: '400px' }}>
          <div
            style={{
              maxHeight: '295px',
              overflow: 'auto',
              marginTop: '8px',
              marginBottom: '5px',
              padding: '10px'
            }}
          >
            <Table
              rowKey="MACAddress"
              columns={columns}
              style={{ width: '100%' }}
              // onClick={handleDeviceListItemOnClick()}
              // dataSource={data(deviceStatus)}
              pagination={{
                position: ['bottomCenter'],
                showQuickJumper: true,
                size: 'default',
                // total: data(deviceStatus).length,
                defaultPageSize: 10,
                pageSizeOptions: [10, 15, 20, 25],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
              }}
            ></Table>
          </div>
        </div>
      </Card>
    </ConfigProvider>
  )
}

export default DeviceList
