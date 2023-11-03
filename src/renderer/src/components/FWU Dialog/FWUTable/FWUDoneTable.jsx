import React from 'react'
import { Progress, Table } from 'antd'
// import PropTypes from 'prop-types'
// import styles from './FWUDoneTable.scss'
//import FWUDoneTableRow from './FWUDoneTableRow/FWUDoneTableRow'
import { useSelector } from 'react-redux'
import { firmwareSelector } from '../../../features/firmwareUpdate'
import Code from '../Code/Code'

const FWUDoneTable = () => {
  const { deviceData, deviceRealTimeData } = useSelector(firmwareSelector)
  const data = Object.entries(deviceRealTimeData).map(([key, value]) => ({
    key,
    status: value.code,
    Progress: value.uploadProgress
  }))
  console.log(data)
  const dataSource = Object.entries(deviceData).map(([key, value]) => ({
    key,
    MACAddress: key,
    IPAddress: value.IPAddress,
    model: value.model,
    data
  }))
  console.log(dataSource)
  const columns = [
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model'
    },
    {
      title: 'IP Address',
      dataIndex: 'IPAddress',
      key: 'IPAddress'
    },
    {
      title: 'MAC Address',
      dataIndex: 'MACAddress',
      key: 'MACAddress'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (record) => {
        return <span>{deviceRealTimeData.code}</span>
      }
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (record) => {
        return (
          <Progress
            type="line"
            percent={deviceRealTimeData.uploadProgress}
            //   status={record.uploadProgress}
          />
        )
      }
    }
  ]

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="MACAddress"
        // className={styles.table}
      />
      // <Code />
    </>
  )
}

export default FWUDoneTable
