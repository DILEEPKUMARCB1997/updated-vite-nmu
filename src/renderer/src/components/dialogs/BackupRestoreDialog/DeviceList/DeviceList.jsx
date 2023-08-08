/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
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
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
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
    key: 'IPAddress',
    sorter: (a, b) => a.IPAddress - b.IPAddress
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
    // render: (element) =>
    //   element ? (
    //     <span style={{ color: 'green' }}>SUCCESS</span>
    //   ) : (
    //     <span style={{ color: 'red' }}>ERROR</span>
    //   )
  }
]

const DeviceList = () => {
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()
  const { mode, isTaskRunning, isRestoreFisish, deviceStatus } = useSelector(backupRestoreSelector)
  console.log(deviceStatus)
  const handleModeSelectOnChange = (mode) => {
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
  const dataSource = []
  useEffect(() => {
    dataSource.push(deviceStatus)
    console.log(dataSource)
  }, [])

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
              <Progress
                style={{
                  width: '300px',
                  verticalAlign: 'middle'
                }}
                percent={20}
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
              rowKey={deviceStatus.key}
              columns={columns}
              dataSource={[deviceStatus]}
              style={{ width: '100%' }}
              onClick={handleDeviceListItemOnClick}
              pagination={{
                position: ['bottomCenter'],
                showQuickJumper: true,
                size: 'default',
                total: dataSource.length,
                defaultPageSize: 10,
                pageSizeOptions: [10, 15, 20, 25],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
              }}
            >
              {/* {Object.entries(deviceStatus).map(([MACAddress, element]) => (
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
              ))} */}
            </Table>
          </div>
          <Alert message={TIPS_TEXT} banner type="info" showIcon style={{ top: '-30px' }} />
        </div>
      </Card>
    </ConfigProvider>
  )
}

export default DeviceList
