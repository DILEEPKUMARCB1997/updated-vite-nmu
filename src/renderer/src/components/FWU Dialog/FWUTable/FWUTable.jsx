/* eslint-disable no-unused-vars */
import React from 'react'
import { firmwareSelector } from '../../../features/firmwareUpdate'
import { Progress, Table } from 'antd'
import { useSelector } from 'react-redux'

const codes = {
  none: { type: 'normal', label: 'Waiting' },
  a: { type: 'normal', label: 'Upload Image' },
  c: { type: 'normal', label: 'User Cancel' },
  S001: { type: 'normal', label: 'Erasing' },
  S002: { type: 'success', label: 'Update Successful' },
  E001: { type: 'error', label: 'Upload Fail(E001)' },
  E007: { type: 'error', label: 'Upload Fail(E007)' },
  TO: { type: 'error', label: 'Connect Timeout' }
}

const FWUTable = () => {
  const { deviceData, deviceRealTimeData } = useSelector(firmwareSelector)

  const columnData = [
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
      sorter: (a, b) => (a.model > b.model ? 1 : -1)
    },
    {
      title: 'IP Address',
      dataIndex: 'IPAddress',
      key: 'IPAddress',
      sorter: (a, b) => (a.IPAddress > b.IPAddress ? 1 : -1)
    },
    {
      title: 'MAC Address',
      dataIndex: 'MACAddress',
      key: 'MACAddress'
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (record, value) => {
        return (
          <Progress type="line" percent={value.uploadProgress} status={record.uploadProgress} />
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (record) => {
        console.log(record)
        const status = codes[record.status]
        return (
          <span color={status.type} key={record.status}>
            {status.label}
          </span>
        )
      }
    }
  ]

  const data = Object.entries(deviceRealTimeData).map(([key, value]) => ({
    key,
    status: value.code,
    progress: value.uploadProgress
  }))

  const dataSource = Object.entries(deviceData).map(([key, value]) => ({
    key,
    MACAddress: key,
    IPAddress: value.IPAddress,
    model: value.model,
    progress: data.find((item) => item.key === key)?.progress,
    status: data.find((item) => item.key === key)?.status
  }))
  console.log(dataSource)
  return (
    <div>
      <Table columns={columnData} dataSource={dataSource} rowKey="MACAddress" />
    </div>
  )
}

export default FWUTable
