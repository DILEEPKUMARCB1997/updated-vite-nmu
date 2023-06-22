/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Modal, Divider, Table, Input, Button, DatePicker } from 'antd'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CloseCircleFilled } from '@ant-design/icons'
// import { Close } from '@material-ui/icons'
//import { RangePicker } from 'antd'

const { RangePicker } = DatePicker
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

function SyslogHistoryDialog(props) {
  const { onClose, requestHistoryData, clearHistoryData, classes, syslogHistoryData } = props

  const [sourceIP, setSourceIP] = useState('')
  const [ge, setGe] = useState('')
  const [le, setLe] = useState('')
  const [tableLoading, setTableLoading] = useState(true)
  useEffect(() => {
    setTableLoading(false)
  }, [])
  const handleSourceIPInputOnChange = (event) => {
    setSourceIP(event.target.value)
  }
  const rangePickerChange = (value, dateString) => {
    setGe(dateString[0])
    setLe(dateString[1])
  }

  const rangePickerOKButtonClick = (value, dateString) => {
    setGe(dateString[0])
    setLe(dateString[1])
  }

  const handleRefreshButtonClick = () => {
    requestHistoryData({ type: 'syslog', sourceIP: sourceIP, ge: ge, le: le })
  }
  const handleCloseButtonOnClick = () => {
    onClose()
    clearHistoryData()
  }
  return (
    <Modal open width="80%" footer={null} onCancel={handleCloseButtonOnClick}>
      <div>
        <span>Syslog History</span>
      </div>
      <div>
        <Input placeholder="Source IP" onChange={handleSourceIPInputOnChange} />

        <RangePicker
          popupStyle={{ zIndex: '1301' }}
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder={['Start Time', 'End Time']}
          onChange={rangePickerChange}
          onOk={rangePickerOKButtonClick}
        />
        <Button type="primary" onClick={handleRefreshButtonClick}>
          {' '}
          Refresh{' '}
        </Button>
      </div>
      <Divider style={{ margin: '10px 0px' }} />
      <Table
        loading={tableLoading}
        rowKey="syslogId"
        bordered
        columns={columns}
        dataSource={syslogHistoryData}
        pagination={{ pageSize: 25 }}
        scroll={{ y: 'calc(80vh - 165px)', x: 1500 }}
      />
    </Modal>
  )
}
SyslogHistoryDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  requestHistoryData: PropTypes.func.isRequired,
  clearHistoryData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  syslogHistoryData: PropTypes.array.isRequired
}
export default SyslogHistoryDialog
