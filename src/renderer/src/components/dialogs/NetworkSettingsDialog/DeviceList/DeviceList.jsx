/* eslint-disable no-unused-vars */
import { Button, Card, Form, Input, Progress, Table, Typography, theme } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  calculateIPAddress,
  networkSettingSelector,
  setStartAddress
} from '../../../../features/networkSettingSlice'

const DeviceList = () => {
  const {
    isDHCP,
    status,
    completeNum,
    deviceNum,
    failNum,
    deviceList,
    startAddress,
    validStartAddress
  } = useSelector(networkSettingSelector)
  console.log(deviceList)
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()

  const columns = [
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
      width: 120,
      align: 'center'
    },
    {
      title: 'MAC Address',
      dataIndex: 'MACAddress',
      key: 'MACAddress',
      width: 200,
      align: 'center'
    },
    {
      title: 'IP Address',
      dataIndex: 'IPAddress',
      key: 'IPAddress',
      width: 130,
      align: 'center',
      action: <Input />
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      width: 80,
      align: 'center'
    }
  ]

  const dataSource = []
  useEffect(() => {
    dataSource.push(deviceList)
    console.log(dataSource)
  })

  const handleStartAddressInputChange = (e) => {
    dispatch(setStartAddress(e.target.value))
  }

  const handleCalculateButtonClick = () => {
    dispatch(calculateIPAddress())
  }

  return (
    <Card
      title="IP Assign"
      size="small"
      headStyle={{ backgroundColor: token.colorPrimaryBorder }}
      style={{
        height: '450px',
        borderRadius: '4px',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Form.Item label="Start Address" colon={false} style={{ margin: '0px', tableLayout: true }}>
          <Input
            value={startAddress}
            disabled={status !== 'wait' || isDHCP}
            onChange={handleStartAddressInputChange}
          />
        </Form.Item>
        <Button
          type="primary"
          style={{ marginLeft: '20px' }}
          disabled={!validStartAddress || status !== 'wait' || isDHCP}
          onClick={handleCalculateButtonClick}
        >
          Calculate
        </Button>
      </div>
      {status !== 'wait' && (
        <Progress
          percent={(completeNum / deviceNum) * 100}
          strokeColor={token.colorPrimary}
          style={{ marginTop: '5px', marginBottom: '5px' }}
        />
      )}
      {status === 'finish' && (
        <Typography.Text>{`* Network setting finish with ${failNum} fail.`}</Typography.Text>
      )}
      <div style={{ height: '250px', marginTop: '10px' }}>
        <Table
          rowKey={deviceList.key}
          columns={columns}
          dataSource={dataSource}
          size="small"
          pagination={{
            position: ['bottomRight'],
            showQuickJumper: true,
            size: 'small',
            total: dataSource.length,
            defaultPageSize: 5,
            pageSizeOptions: [5, 10, 15, 20],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
        />
      </div>
    </Card>
  )
}

export default DeviceList
