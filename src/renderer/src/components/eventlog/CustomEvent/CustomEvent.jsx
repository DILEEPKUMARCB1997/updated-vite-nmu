/*
import React, { useState, useEffect } from 'react'
import { Table, Alert, Button, Card } from 'antd'
import {
  eventLogSelector,
  clearCustomEventData,
  requestHistoryData
} from '../../../features/eventLogSlice'
import { openDialog } from '../../../features/dialogSlice'
import { useDispatch, useSelector } from 'react-redux'

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
    key: 'eventCondition',
    title: 'Event Condition',
    dataIndex: 'eventCondition'
  },
  {
    key: 'severity',
    title: 'Severity',
    dataIndex: 'severity',
    sorter: (a, b) => (a.severity > b.severity ? 1 : -1),
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'sourceIP',
    title: 'Source IP',
    dataIndex: 'sourceIP',
    width: 150,
    sorter: (a, b) => (a.sourceIP > b.sourceIP ? 1 : -1),
    sortDirections: ['descend', 'ascend']
  },
  { key: 'model', title: 'Model', dataIndex: 'model', width: 200 },
  {
    key: 'MACAddress',
    title: 'MAC Address',
    dataIndex: 'MACAddress',
    width: 200
  },
  { key: 'msg', title: 'Message', dataIndex: 'msg' }
]

const CustomEvent = () => {
  const { customEventData } = useSelector(eventLogSelector)
  console.log(customEventData)
  const [tableLoading, setTableLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    setTableLoading(false)
  }, [])

  const handleHistoryButtonOnClick = () => {
    dispatch(
      requestHistoryData({
        type: 'custom',
        sourceIP: '',
        ge: '',
        le: ''
      })
    )
    dispatch(openDialog('customHistory'))
  }

  const handleClearButtonOnClick = () => {
    dispatch(clearCustomEventData())
  }

  return (
    <Card>
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
        loading={tableLoading}
        bordered
        columns={columns}
        dataSource={customEventData}
        pagination={{ pageSize: 25 }}
        scroll={{ y: 'calc(100vh - 365px)', x: 1500 }}
        rowClassName={(record) => {
          if (record.severity === 'Information') return 'table-information'
          if (record.severity === 'Warning') return 'table-warning'
          if (record.severity === 'Critical') return 'table-critical'
          return ''
        }}
      />
    </Card>
  )
}

export default CustomEvent
*/
import React, { useEffect, useState } from 'react'
import { Alert, Button, ConfigProvider, Table, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearCustomEventData,
  eventLogSelector,
  requestHistoryData
} from '../../../features/eventLogSlice'
import { openDialog } from '../../../features/dialogSlice'

function CustomEvent() {
  const { useToken } = theme
  const { token } = useToken()
  const { customEventData } = useSelector(eventLogSelector)
  console.log(customEventData)
  const dispatch = useDispatch()
  const [tableLoading, setTableLoading] = useState(true)
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
      key: 'eventCondition',
      title: 'Event Condition',
      dataIndex: 'eventCondition'
    },
    {
      key: 'severity',
      title: 'Severity',
      dataIndex: 'severity',
      sorter: (a, b) => (a.severity > b.severity ? 1 : -1),
      sortDirections: ['descend', 'ascend']
    },
    {
      key: 'sourceIP',
      title: 'Source IP',
      dataIndex: 'sourceIP',
      width: 150,
      sorter: (a, b) => (a.sourceIP > b.sourceIP ? 1 : -1),
      sortDirections: ['descend', 'ascend']
    },
    { key: 'model', title: 'Model', dataIndex: 'model', width: 200 },
    {
      key: 'MACAddress',
      title: 'MAC Address',
      dataIndex: 'MACAddress',
      width: 200
    },
    { key: 'msg', title: 'Message', dataIndex: 'msg' }
  ]
  // useEffect((param) => {
  //   window.electron.ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
  //     const { data } = arg
  //     console.log(arg)
  //     // dispatch(updateEventHistory(data))
  //   })
  //   window.electron.ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, param)
  // })

  useEffect(() => {
    setTableLoading(false)
  }, [])

  const handleHistoryButtonOnClick = () => {
    dispatch(
      requestHistoryData({
        type: 'custom',
        sourceIP: '',
        ge: '',
        le: ''
      })
    )

    dispatch(openDialog('customHistory'))
  }

  const handleClearButtonOnClick = () => {
    dispatch(clearCustomEventData())
  }

  return (
    // <div>Events</div>
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
      <div
        style={{
          boxSizing: 'border-box',
          position: 'relative',
          height: '100%',
          width: '100%',
          minWidth: '761px',
          paddingTop: '0px'
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
          dataSource={customEventData}
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
          rowClassName={(record) => {
            if (record.severity === 'Information') return 'table-information'
            if (record.severity === 'Warning') return 'table-warning'
            if (record.severity === 'Critical') return 'table-critical'
            return ''
          }}
          // scroll={{ y: 'calc(100vh - 365px)', x: 1500 }}
        />
        {/* </Card> */}
      </div>
    </ConfigProvider>
  )
}

export default CustomEvent
