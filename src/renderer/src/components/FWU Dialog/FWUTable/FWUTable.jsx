import React, { useEffect, useState } from 'react'
import { firmwareSelector } from '../../../features/firmwareUpdate'
import { Progress, Table, Tag } from 'antd'
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
  const { code, uploadProgress } = deviceRealTimeData
  console.log(uploadProgress)

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
      render: (text, record) => (
        <Progress type="line" style={{ width: '150' }} percent={record.uploadProgress} />
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        //const code = codes[text]
        return (
          <span title={codes.label}>
            <Tag
              style={{
                color:
                  codes.type === codes.S002
                    ? 'green'
                    : codes.type === codes.E001
                    ? 'red'
                    : codes.type === codes.none
                    ? 'blue'
                    : 'gray'
              }}
            >
              {codes.label}
            </Tag>
          </span>
        )
      }
    }
  ]

  const dataSource = Object.entries(deviceData).map(([key, value]) => ({
    key,
    MACAddress: key,
    IPAddress: value.IPAddress,
    model: value.model,
    status: value.status,
    progress: uploadProgress
  }))
  console.log(dataSource)

  return (
    <div>
      <Table columns={columnData} dataSource={dataSource} rowKey="MACAddress" />
    </div>
  )
}

export default FWUTable
