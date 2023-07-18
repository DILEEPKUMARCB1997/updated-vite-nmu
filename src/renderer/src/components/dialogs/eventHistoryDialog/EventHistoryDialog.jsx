import { Button, Divider, Input, Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearHistoryData,
  eventLogSelector,
  requestHistoryData
} from '../../../features/eventLogSlice'
import CustomRangePicker from '../Common Code/CustomRangePicker'

const EventHistoryDialog = ({ onClose }) => {
  const [tableLoading, setTableLoading] = useState(true)
  const [MACAddress, setMACAddress] = useState('')
  const [dateRange, setDateRange] = useState({ ge: '', le: '' })
  const { eventHistoryData } = useSelector(eventLogSelector)
  const dispatch = useDispatch()
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
      key: 'IPAddress',
      title: 'Source IP',
      dataIndex: 'IPAddress',
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

  useEffect(() => {
    setTableLoading(false)
  }, [])

  const handleMACAddressInputChange = (event) => {
    setMACAddress(event.target.value)
  }

  const rangePickerChange = (value, dateString) => {
    setDateRange({ ...dateRange, ge: dateString[0], le: dateString[1] })
  }

  const handleRefreshButtonClick = () => {
    dispatch(
      requestHistoryData({
        type: 'event',
        MACAddress: MACAddress,
        ge: dateRange.ge,
        le: dateRange.le
      })
    )
  }

  const handleCloseButtonOnClick = () => {
    dispatch(onClose())
    clearHistoryData()
  }

  return (
    <Modal
      title="Event History"
      open
      onOk={onClose}
      onCancel={handleCloseButtonOnClick}
      width={1200}
      okButtonProps={{
        style: {
          display: 'none'
        }
      }}
      cancelButtonProps={{
        style: {
          display: 'none'
        }
      }}
    >
      <div style={{ display: 'inline-flex', marginTop: '9px' }}>
        <Input
          placeholder="MAC Address"
          style={{ width: '150px', margin: '0px 10px 0px 10px' }}
          onChange={handleMACAddressInputChange}
        />
        <CustomRangePicker onChange={rangePickerChange} />
        <Button
          type="primary"
          ghost
          // style={{ margin: '10px' }}
          onClick={handleRefreshButtonClick}
          // className={styles.refreshButton}
        >
          Refresh
        </Button>
      </div>

      <Divider style={{ margin: '10px 0px' }} />
      <Table
        loading={tableLoading}
        rowKey="eventId"
        bordered
        columns={columns}
        dataSource={eventHistoryData}
        pagination={{
          // showQuickJumper: true,
          // showSizeChanger: true,
          size: 'default',
          defaultPageSize: 25,
          pageSizeOptions: [25, 50, 75, 100],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        }}
        scroll={{ y: 'calc(80vh - 165px)' }}
      />
    </Modal>
  )
}

export default EventHistoryDialog
