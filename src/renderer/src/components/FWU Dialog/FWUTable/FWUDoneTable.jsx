import React from 'react'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import { firmwareSelector } from '../../../features/firmwareUpdate'

const FWUDoneTable = () => {
  const { deviceData, deviceRealTimeData, FWUDoneDeviceData } = useSelector(firmwareSelector)

  const columnData = [
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
      key: 'status'
    }
  ]

  const data = Object.entries(deviceRealTimeData).map(([key, value]) => ({
    key,
    status: value.code
  }))

  const dataSource = Object.entries(deviceData).map(([key, value]) => ({
    key,
    MACAddress: key,
    IPAddress: value.IPAddress,
    model: value.model,
    status: data.find((item) => item.key === key)?.status
  }))

  const updateDataSource = FWUDoneDeviceData.map(([key]) => {
    const device = dataSource[key]
    return {
      key: device?.key,
      MACAddress: device?.MACAddress,
      IPAddress: device?.IPAddress,
      model: device?.model,
      status: device?.status
    }
  })
  console.log(updateDataSource)

  return <Table dataSource={updateDataSource} columns={columnData} rowKey="MACAddress" />
}

export default FWUDoneTable
