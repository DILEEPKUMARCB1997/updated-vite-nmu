/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
// import './SNMPTrap.css'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Alert, Button, Card, theme, ConfigProvider } from 'antd'

import { clearTrapData, eventLogSelector, requestHistoryData } from '../../features/eventLogSlice'
import { openDialog } from '../../features/dialogSlice'

const columns = [
  {
    key: 'createAt',
    title: 'Time',
    dataIndex: 'createAt',
    width: 200,
    defaultSortOrder: 'descend',
    sorter: (a, b) => new Date(a.createAt) - new Date(b.createAt)
  },
  {
    key: 'sourceIP',
    title: 'Source IP',
    dataIndex: 'sourceIP',
    width: 150,
    sorter: (a, b) => (a.sourceIP > b.sourceIP ? 1 : -1),
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'upTime',
    title: 'Up Time',
    dataIndex: 'upTime',
    width: 150,
    sorter: (a, b) => a.upTime - b.upTime,
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'specific',
    title: 'GT',
    dataIndex: 'specific',
    width: 150,
    sorter: (a, b) => a.specific - b.specific,
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'generic',
    title: 'ST',
    dataIndex: 'generic',
    width: 150,
    sorter: (a, b) => a.generic - b.generic,
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'version',
    title: 'Version',
    dataIndex: 'version',
    width: 100,
    sorter: (a, b) => a.version - b.version,
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'enterprise',
    title: 'Enterprise',
    dataIndex: 'enterprise',
    width: 150
  },
  { key: 'community', title: 'Community', dataIndex: 'community', width: 150 },
  { key: 'msg', title: 'Description', dataIndex: 'msg' }
]

const SNMPTrap = () => {
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()
  const { trapData } = useSelector(eventLogSelector)
  // console.log(trapData)
  const [tableLoading, setTableLoading] = useState(true)

  useEffect(() => {
    setTableLoading(false)
  }, [])

  const handleHistoryButtonOnClick = () => {
    dispatch(
      requestHistoryData({
        type: 'trap',
        sourceIP: '',
        ge: '',
        le: ''
      })
    )
    dispatch(openDialog('trapHistory'))
  }
  const handleClearButtonOnClick = () => {
    dispatch(clearTrapData())
  }

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
      <Button
        type="primary"
        ghost
        style={{ margin: '0px 0px 15px 0px' }}
        onClick={handleHistoryButtonOnClick}
      >
        History
      </Button>
      <Button
        type="primary"
        ghost
        style={{ marginLeft: '10px', marginBottom: '15px' }}
        onClick={handleClearButtonOnClick}
      >
        Clear
      </Button>
      <Alert
        message="Here can check today log data, please check history for past data."
        type="warning"
        showIcon
      />
      <Table
        loading={tableLoading}
        bordered
        columns={columns}
        dataSource={trapData}
        pagination={{ pageSize: 25 }}
        scroll={{ y: 'calc(100vh - 365px)', x: 1500 }}
      />
    </ConfigProvider>
  )
}

export default SNMPTrap
