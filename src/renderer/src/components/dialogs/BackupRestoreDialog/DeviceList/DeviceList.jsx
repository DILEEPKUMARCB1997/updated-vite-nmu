/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import {
  Card,
  Select,
  Button,
  Progress,
  App,
  Typography,
  Table,
  Alert,
  theme,
  ConfigProvider
} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import {
  changeMode,
  backupRestoreSelector,
  startTask,
  deviceSelect
} from '../../../../features/backupRestoreSlice'
import { useDispatch, useSelector } from 'react-redux'

const SUCCESS = 1
const ERROR = 2
// const { Option } = Select
const TIPS_TEXT =
  'If Backup or Restore fail, please check you select NIC with a real external IP.' +
  ' (File \u279E Preferences \u279E General \u279E Network Interface Card)'
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
    render: (text, record) => (
      console.log(record),
      (
        <span
          style={{
            color: record.status === SUCCESS ? 'green' : record.status === ERROR ? 'red' : null
          }}
        >
          {results[record.status]}
        </span>
      )
    )
  }
]

const DeviceList = () => {
  const { useToken } = theme
  const { token } = useToken()
  const { notification } = App.useApp()
  const dispatch = useDispatch()
  const { mode, isTaskRunning, isRestoreFisish, deviceStatus, selectDevice } =
    useSelector(backupRestoreSelector)
  console.log(deviceStatus)

  const handleModeSelectOnChange = (mode) => {
    dispatch(changeMode({ mode }))
  }

  const handleStartButtonOnClick = () => {
    dispatch(
      startTask((msg) => {
        console.log('msg', msg)
        notification.error({ message: msg })
      })
    )
  }
  const handleDeviceListItemOnClick = (MACAddress) => {
    dispatch(deviceSelect({ selectDevice: MACAddress }))
  }

  const data = Object.entries(deviceStatus).map(([key, element]) => ({
    key,
    element,
    MACAddress: key,
    IPAddress: element.IPAddress,
    model: element.model,
    status: element.status
  }))

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
        // bodyStyle={{ padding: '5px' }}
        // headStyle={{ backgroundColor: token.colorPrimaryBorder }}
        style={{
          height: '450px',
          borderRadius: '4px',
          boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
        }}
        headStyle={{ backgroundColor: token.colorPrimaryBorder }}
      >
        <div
          style={{
            height: '400px'
          }}
        >
          <div>
            <Select
              onChange={handleModeSelectOnChange}
              value={mode}
              disabled={isTaskRunning || isRestoreFisish}
              defaultValue="backup"
              dropdownStyle={{ zIndex: '1301' }}
              style={{
                width: '100px',
                marginRight: '10px',
                verticalAlign: 'middle'
              }}
              options={[
                {
                  value: 'backup',
                  label: 'Backup'
                },
                {
                  value: 'restore',
                  label: 'Restore'
                }
              ]}
            >
              {/* <Option value="backup">Backup</Option>
            <Option value="restore">Restore</Option> */}
            </Select>
            {isTaskRunning ? (
              <LoadingOutlined
                style={{
                  fontSize: 30,
                  marginRight: '15px'
                }}
                spin
              />
            ) : (
              <Button
                type="primary"
                disabled={isTaskRunning || isRestoreFisish}
                onClick={handleStartButtonOnClick}
              >
                Start
              </Button>
            )}
          </div>
          <div
            style={{
              height: '295px',
              overflow: 'auto',
              marginTop: '10px',
              marginBottom: '5px'
            }}
          >
            <Table
              rowKey={deviceStatus.key}
              columns={columns}
              dataSource={data}
              style={{ width: '100%' }}
              pagination={{
                position: ['bottomCenter'],
                showQuickJumper: true,
                size: 'default',
                total: data.length,
                defaultPageSize: 10,
                pageSizeOptions: [10, 15, 20, 25],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    event.preventDefault()
                    handleDeviceListItemOnClick(record.MACAddress)
                  }
                }
              }}
            ></Table>
          </div>
          <Alert message={TIPS_TEXT} banner type="info" showIcon style={{ top: '-30px' }} />
        </div>
      </Card>
    </ConfigProvider>
  )
}

export default DeviceList
