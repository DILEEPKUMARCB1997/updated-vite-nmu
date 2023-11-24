/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Alert, Button, ConfigProvider, Table, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { clearSyslogData, eventLogSelector, requestHistoryData } from '../../features/eventLogSlice'
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
function Syslog() {
  const { useToken } = theme
  const { token } = useToken()
  const { syslogData } = useSelector(eventLogSelector)
  // console.log(syslogData)
  const dispatch = useDispatch()
  const [tableLoading, setTableLoading] = useState(true)

  useEffect(() => {
    setTableLoading(false)
  }, [])

  const handleHistoryButtonOnClick = () => {
    console.log(syslogData)
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
        dataSource={syslogData}
        pagination={{ pageSize: 25 }}
        scroll={{ y: 'calc(100vh - 365px)', x: 1500 }}
      />
    </ConfigProvider>
  )
}

export default Syslog
