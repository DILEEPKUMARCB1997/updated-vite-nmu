/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { ConfigProvider, Card, Typography, Table, theme } from 'antd'

import { trapSettingSelector } from '../../../../features/trapSettingSlice'
import { useSelector } from 'react-redux'

const SUCCESS = 1
const ERROR = 2
const results = ['WAITING', 'SUCCESS', 'ERROR']
const columns = [
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
    sorter: (a, b) => a.modal - b.modal
  },
  {
    title: 'MAC Address',
    dataIndex: 'MACAddress',
    key: 'MACAddress',
    sorter: (a, b) => a.MACAddress - b.MACAddress
  },
  {
    title: 'IP Address',
    dataIndex: 'IPAddress',
    key: 'IPAddress',
    sorter: (a, b) => a.IPAddress - b.IPAddress
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (element) =>
      element ? (
        element ? (
          <span style={{ color: 'green' }}>SUCCESS</span>
        ) : (
          <span style={{ color: 'red' }}>ERROR</span>
        )
      ) : (
        <span>WAITING</span>
      )
  }
]
const DeviceList = () => {
  const { isTaskRunning, deviceStatus } = useSelector(trapSettingSelector)
  // console.log(isTaskRunning)

  const { useToken } = theme
  const { token } = useToken()
  // const dataSource = []
  // useEffect(() => {
  //   dataSource.push(deviceStatus)
  //   console.log(dataSource)
  // }, [])

  const data = Object.entries(deviceStatus).map(([key, element]) => ({
    key,
    MACAddress: key,
    IPAddress: element.IPAddress,
    model: element.model,
    status: element.status
  }))
  console.log(data)
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
        title=" Devices"
        // style={{ width: '100%', height: '100%' }}
        bordered={false}
        style={{
          height: '450px',
          borderRadius: '4px',
          boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
        }}
        headStyle={{ backgroundColor: token.colorPrimaryBorder }}
        // bodyStyle={{ padding: '5px' }}
      >
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
              dataSource={data}
              pagination={{
                position: ['bottomCenter'],
                showQuickJumper: true,
                size: 'default',
                total: data.length,
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
