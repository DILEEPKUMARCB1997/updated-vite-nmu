import React, { useEffect, useState } from 'react'
import { firmwareSelector } from '../../../features/firmwareUpdate'
import { Progress, Table, Tag } from 'antd'
import { useSelector } from 'react-redux'
import Code from '../Code/Code'
//import Code from '../Code/Code'

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
  // console.log(deviceRealTimeData)
  // console.log(deviceData)

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
      dataIndex: 'uploadProgress',
      key: 'uploadProgress',
      render: (text, record) => {
        const progress = uploadProgress ? uploadProgress : 0
        return <Progress type="line" style={{ width: '150px' }} percent={progress} />
      }
    },
    {
      title: 'Status',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => {
        // console.log(record)
        // return <Code MACAddress={record.MACAddress} />
        const code1 =
          codes.S001.type[code] === 'success'
            ? 'green'
            : codes.E001.type[code] === 'error'
            ? 'red'
            : 'blue'
        return (
          <span>
            <span style={{ color: code1 }}>{codes.none.label}</span>
          </span>
        )
      }
    }
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (text) => {
    //     const code = codes[text]
    //     return (
    //       <span>
    //         <span
    //           style={{
    //             color:
    //               codes.type === 'success'
    //                 ? 'green'
    //                 : codes.type === 'error'
    //                 ? 'red'
    //                 : codes.type === 'normal'
    //                 ? 'blue'
    //                 : 'gray'
    //           }}
    //         >
    //           {codes.label}
    //         </span>
    //       </span>
    //     )
    //   }
    // }
  ]

  const deviceStatus = Object.entries(deviceRealTimeData).map((item) => ({
    ...item,
    status: item.status,
    progress: item.progress
  }))

  const dataSource = Object.entries(deviceData).map(([key, value]) => ({
    key,
    MACAddress: key,
    IPAddress: value.IPAddress,
    model: value.model,
    deviceStatus
  }))
  console.log(dataSource)

  return (
    <div>
      <Table columns={columnData} dataSource={dataSource} rowKey="MACAddress" />
    </div>
  )
}

export default FWUTable
/*
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
      dataIndex: 'uploadProgress',
      key: 'uploadProgress',
      render: (text, record) => {
        //  const progress = record.uploadProgress ? 0 : record.uploadProgress
        return <Progress type="line" style={{ width: '150px' }} percent={uploadProgress} />
      }
    },
    {
      title: 'Status',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => {
        const code1 =
          codes.S002.type[record.code] === 'success'
            ? '#52c41a'
            : codes.E007.type[record.code] === 'error'
            ? '#f5222d'
            : '#1890ff'
        return (
          <span>
            <Tag style={{ color: code1 }}>{codes.S002.label[record.code]}</Tag>
          </span>
        )
      }
    }
  ]
  const deviceStatus = Object.entries(deviceRealTimeData).map((item) => ({
    item,
    status: item.status,
    progress: item.progress
  }))
  const dataSource = Object.entries(deviceData).map(([key, value]) => ({
    key,
    MACAddress: key,
    IPAddress: value.IPAddress,
    model: value.model,
    deviceStatus
    // status: deviceStatus,
    // progress: deviceStatus
  }))
  console.log(dataSource)

  return (
    <Table dataSource={dataSource} columns={columnData} rowKey="IPAddress" pagination={false} />
  )
}

export default FWUTable
*/
