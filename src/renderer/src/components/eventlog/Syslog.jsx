/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Alert, Button, ConfigProvider, Table, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { clearSyslogData, eventLogSelector, requestHistoryData } from '../../features/eventLogSlice'
import { openDialog } from '../../features/dialogSlice'

function Syslog() {
  const { useToken } = theme
  const { token } = useToken()
  const { syslogData } = useSelector(eventLogSelector)
  console.log(syslogData)
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
      key: 'facility',
      title: 'Facility',
      dataIndex: 'facility',
      width: 110,
      sorter: (a, b) => a.facility - b.facility,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: 'severity',
      title: 'Severity',
      dataIndex: 'severity',
      width: 110,
      sorter: (a, b) => a.severity - b.severity,
      sortDirections: ['descend', 'ascend']
    },
    { key: 'tag', title: 'Tag', dataIndex: 'tag', width: 100 },
    { key: 'message', title: 'Message', dataIndex: 'message' }
  ]

  useEffect(() => {
    setTableLoading(false)
  }, [])

  const handleHistoryButtonOnClick = () => {
    dispatch(
      requestHistoryData({
        type: 'syslog',
        sourceIP: '',
        ge: '',
        le: ''
      })
    )
    dispatch(openDialog('sysLogHistoryDialog'))
  }
  const handleClearButtonOnClick = () => {
    dispatch(clearSyslogData())
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
          dataSource={syslogData}
          loading={tableLoading}
          pagination={{
            size: 'default',
            defaultPageSize: 10,
            pageSizeOptions: [10, 15, 20, 25],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
        />
      </div>
    </ConfigProvider>
  )
}

export default Syslog
