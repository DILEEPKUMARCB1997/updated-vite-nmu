/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  Card,
  Select,
  Button,
  Progress,
  notification,
  Typography,
  Table,
  Alert,
  theme,
  ConfigProvider
} from 'antd'
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
    title: 'Modal',
    dataIndex: 'modal',
    key: 'modal',
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
    key: 'IPAddress'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (element) =>
      element
        ? element.status === SUCCESS && <span style={{ color: 'green' }} />
        : element.status === ERROR && <span style={{ color: 'red' }} />
  }
]

const DeviceList = ({ deviceStatus = [] }) => {
  console.log(deviceStatus)
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()
  const { mode, isTaskRunning, isRestoreFisish, selectDevice } = useSelector(backupRestoreSelector)

  const handleModeSelectOnChange = () => {
    dispatch(changeMode({ mode }))
  }
  const handleStartButtonOnClick = () => {
    dispatch(
      startTask((msg) => {
        notification.error({
          message: msg
        })
      })
    )
  }
  const handleDeviceListItemOnClick = (MACAddress) => () => {
    dispatch(deviceSelect({ selectDevice: MACAddress }))
  }

  // const [inputSearch, setInputSearch] = useState('')
  // const dataAfterfiltering = ({ row }) => {
  //   // return dataSource.filter((row) => {
  //   let rec = columns.map((element) => {
  //     return row[element.dataIndex].toString().includes(inputSearch)
  //   })
  //   return rec.includes(true)
  //   // })
  // }

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
        style={{ width: '100%', height: '100%' }}
        bordered={false}
        bodyStyle={{ padding: '5px' }}
      >
        <Typography.Title level={4} style={{ color: token.colorPrimary }}>
          Devices
        </Typography.Title>
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
              <Progress
                type="circle"
                style={{
                  verticalAlign: 'middle'
                }}
              />
            ) : (
              <Button
                disabled={isTaskRunning || isRestoreFisish}
                variant="outlined"
                size="small"
                type="primary"
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
            >
              {Object.entries(deviceStatus).map(([MACAddress, element]) => (
                <Table.Summary.Row
                  // {MACAddress === selectDevice && <span style={{backgroundColor:"#26c6da"}}/>}
                  key={MACAddress}
                  onClick={handleDeviceListItemOnClick(MACAddress)}
                >
                  {MACAddress === selectDevice && <span style={{ backgroundColor: '#26c6da' }} />}
                  <Typography.Text style={{ borderBottom: '1px solid ', padding: '12px 8px' }}>
                    {element.modal}
                  </Typography.Text>
                  <Typography.Text style={{ borderBottom: '1px solid ', padding: '12px 8px' }}>
                    {MACAddress}
                  </Typography.Text>
                  <Typography.Text style={{ borderBottom: '1px solid ', padding: '12px 8px' }}>
                    {element.IPAddress}
                  </Typography.Text>
                  <Typography.Text style={{ borderBottom: '1px solid ', padding: '12px 8px' }}>
                    {element.status === SUCCESS && <span style={{ color: 'green' }}>SUCCESS</span>}
                    {element.status === ERROR && <span style={{ color: 'red' }}>ERROR</span>}
                    {results[element.status]}
                  </Typography.Text>
                </Table.Summary.Row>
              ))}
            </Table>
          </div>
          <Alert message={TIPS_TEXT} banner type="info" showIcon style={{ top: '-20px' }} />
        </div>
      </Card>
    </ConfigProvider>
  )
}

export default DeviceList
