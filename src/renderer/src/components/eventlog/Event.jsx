/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, ConfigProvider, Table, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { clearEventData, eventLogSelector, requestHistoryData } from '../../features/eventLogSlice'
import { openDialog } from '../../features/dialogSlice'
import { memo } from 'react'

function Event() {
  const { useToken } = theme
  const { token } = useToken()
  const { eventData } = useSelector(eventLogSelector)
  // console.log(eventData)
  const dispatch = useDispatch()
  const [tableLoading, setTableLoading] = useState(true)
  const columns = [
    {
      key: 'createAt',
      title: 'Time',
      dataIndex: 'createAt',
      width: 150,
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.createAt) - new Date(b.createAt)
    },
    {
      key: 'IPAddress',
      title: 'Source IP',
      dataIndex: 'IPAddress',
      width: 150,
      sorter: (a, b) => (a.sourceIP > b.sourceIP ? 1 : -1),
      sortDirections: ['descend', 'ascend']
    },
    { key: 'model', title: 'Model', dataIndex: 'model', width: 180 },
    {
      key: 'MACAddress',
      title: 'MAC Address',
      dataIndex: 'MACAddress',
      width: 150
    },
    { key: 'msg', title: 'Message', dataIndex: 'msg', width: 150 }
  ]

  useEffect(() => {
    setTableLoading(false)
  }, [])

  const handleHistoryButtonOnClick = () => {
    dispatch(
      requestHistoryData({
        type: 'event',
        MACAddress: '',
        ge: '',
        le: ''
      })
    )
    dispatch(openDialog('eventHistory'))
  }

  const handleClearButtonOnClick = () => {
    dispatch(clearEventData())
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
      {/* // <Card> */}
      <Button type="primary" ghost onClick={handleHistoryButtonOnClick}>
        History
      </Button>
      <Button
        type="primary"
        ghost
        onClick={handleClearButtonOnClick}
        style={{ marginBottom: '15px', marginLeft: '10px' }}
      >
        Clear
      </Button>
      <Alert
        message="Here you can check today's log data, please check history for past data."
        type="warning"
        showIcon
      />
      <Table
        columns={columns}
        bordered
        dataSource={eventData}
        loading={tableLoading}
        // bordered
        pagination={{
          // showQuickJumper: true,
          // showSizeChanger: true,
          size: 'default',
          defaultPageSize: 10,
          pageSizeOptions: [10, 15, 20, 25],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        }}
        scroll={{ y: 'calc(100vh - 365px)', x: 1000 }}
      />
      {/* </Card> */}
    </ConfigProvider>
  )
}

export default memo(Event)
