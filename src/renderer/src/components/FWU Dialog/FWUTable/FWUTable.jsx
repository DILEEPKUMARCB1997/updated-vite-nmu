import React from 'react'
import { firmwareSelector } from '../../../features/firmwareUpdate'
import { Progress, Table } from 'antd'
import { useSelector } from 'react-redux'
import Code from '../Code/Code'
import { update } from 'lodash'

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

const FWUTable = (props) => {
  const { deviceData, deviceRealTimeData } = useSelector(firmwareSelector)
  // const { code, uploadProgress } = deviceRealTimeData
  const { uploadProgress, code } = deviceRealTimeData

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
      render: (text, record) => {
        return <Progress type="line" percent={uploadProgress} status={record.uploadProgress} />
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (record) => (
        <span
          style={{
            color: codes[code] === 'success' ? 'green' : codes[code] === 'error' ? 'red' : 'blue'
          }}
        >
          {codes[code]}
        </span>
        // console.log(record)
        // const code1 =
        //   codes.S001.type[record.code] === 'success'
        //     ? 'green'
        //     : codes.E001.type[record.code] === 'error'
        //     ? 'red'
        //     : 'blue'
        // return (
        //   <span>
        //     <span style={{ color: code1 }}>{codes.none.label}</span>
        //   </span>
        // )
      )
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

  const data = Object.entries(deviceRealTimeData).map(([key, value]) => ({
    key,
    status: value.code,
    Progress: value.uploadProgress
  }))

  const dataSource = Object.entries(deviceData).map(([key, value]) => ({
    key,
    MACAddress: key,
    IPAddress: value.IPAddress,
    model: value.model,
    data
  }))
  console.log(dataSource)

  return (
    <div>
      <Table columns={columnData} dataSource={dataSource} rowKey="MACAddress" />
    </div>
  )
}

export default FWUTable
