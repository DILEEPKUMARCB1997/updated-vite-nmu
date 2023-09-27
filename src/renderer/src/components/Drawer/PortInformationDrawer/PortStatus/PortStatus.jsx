/* eslint-disable no-unused-vars */
import { Card, Switch, Table, theme } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  portInformationSelector,
  requestSetPortStatus
} from '../../../../features/portInformationSlice'

const PortStatus = () => {
  const dispatch = useDispatch()
  const { useToken } = theme
  const { token } = useToken()

  const { portStatusData, isWaiting, switchLoadings } = useSelector(portInformationSelector)
  console.log(portStatusData)

  let arrayData = []
  arrayData = Object.entries(portStatusData).forEach(([portName, portStatus]) => {
    arrayData = [
      ...arrayData,
      {
        ...portStatus,
        portName
      }
    ]
  })

  const columns = (func, switchLoadings) => [
    {
      title: 'portName',
      dataIndex: 'portName',
      width: 100,
      key: 'portName',
      fixed: 'left'
    },
    {
      title: 'portStatus',
      width: 100,
      dataIndex: 'portStatus',
      key: 'portStatus'
    },
    {
      title: 'Speed',
      width: 100,
      dataIndex: 'speed',
      key: 'speed'
    },
    {
      title: 'Port Mode',
      width: 100,
      dataIndex: 'portMode',
      key: 'portMode'
    },
    {
      title: 'inOctets',
      width: 150,
      dataIndex: 'inOctets',
      key: 'inOctets'
    },
    {
      title: 'inErrors',
      width: 150,
      dataIndex: 'inErrors',
      key: 'inErrors'
    },
    {
      title: 'inUcastPkts',
      width: 150,
      dataIndex: 'inUcastPkts',
      key: 'inUcastPkts'
    },
    {
      title: 'inMulticastPkts',
      width: 150,
      dataIndex: 'inMulticastPkts',
      key: 'inMulticastPkts'
    },
    {
      title: 'inBroadcastPkts',
      width: 150,
      dataIndex: 'inBroadcastPkts',
      key: 'inBroadcastPkts'
    },
    {
      title: 'outOctets',
      width: 150,
      dataIndex: 'outOctets',
      key: 'outOctets'
    },
    {
      title: 'outErrors',
      width: 150,
      dataIndex: 'outErrors',
      key: 'outErrors'
    },
    {
      title: 'outUcastPkts',
      width: 150,
      dataIndex: 'outUcastPkts',
      key: 'outUcastPkts'
    },
    {
      title: 'outMulticastPkts',
      width: 150,
      dataIndex: 'outMulticastPkts',
      key: 'outMulticastPkts'
    },
    {
      title: 'outBroadcastPkts',
      dataIndex: 'outBroadcastPkts',
      width: 150,
      key: 'outBroadcastPkts'
    },
    {
      title: 'enableStatus',
      width: 120,
      fixed: 'right',
      key: 'enableStatus',
      render: (text, record) => (
        <Switch
          loading={switchLoadings.includes(record.portName)}
          checked={record.enableStatus === 1}
          onChange={func(record.portName)}
        />
      )
    }
  ]

  const handlePortSwitchChange = (portName) => (checked) => {
    dispatch(requestSetPortStatus({ portName, checked }))
  }

  return (
    <Card
      title="Port Status"
      size="small"
      bordered={false}
      style={{
        borderRadius: '4px',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
      }}
      headStyle={{ backgroundColor: token.colorPrimaryBorder }}
    >
      <Table
        size="small"
        loading={isWaiting}
        rowKey={(record) => record.portName}
        columns={columns(handlePortSwitchChange, switchLoadings)}
        scroll={{ x: 2021, y: 406 }}
        dataSource={arrayData}
      />
    </Card>
  )
}

export default PortStatus
