/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Table, Modal, ConfigProvider } from 'antd'
import { dashboardSelector } from '../../../features/dashboardSlice'
import { useSelector } from 'react-redux'
import { useTheme } from 'antd-style'

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
    dataIndex: 'eventCondition',
    width: 150
  },
  {
    key: 'severity',
    title: 'Severity',
    dataIndex: 'severity',
    width: 150,
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

const EventGraphTableDialog = ({ onClose }) => {
  const token = useTheme()
  const { customTableData } = useSelector(dashboardSelector)
  const [tableLoading, setTableLoading] = useState(true)

  useEffect(() => {
    setTableLoading(false)
  }, [])

  const handleCloseButtonOnClick = () => {
    onClose()
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
      <Modal
        open
        onCancel={handleCloseButtonOnClick}
        width="90%"
        title=" Event Graph Data"
        onOk={onClose}
        closable={true}
        maskClosable={false}
        style={{ top: 20 }}
        bodyStyle={{
          margin: 0,
          paddingTop: 10,
          paddingBottom: '10px'
        }}
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
        <Table
          loading={tableLoading}
          rowKey="eventId"
          bordered
          style={{ text: { color: token.colorSuccess } }}
          columns={columns}
          dataSource={customTableData}
          rowClassName={(record) => {
            if (record.severity === 'Information') return 'table-information'
            if (record.severity === 'Warning') return 'table-warning'
            if (record.severity === 'Critical') return 'table-critical'
            return ''
          }}
          pagination={{
            // showQuickJumper: true,
            // showSizeChanger: true,
            size: 'default',
            defaultPageSize: 25,
            pageSizeOptions: [25, 50, 75, 100],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
          scroll={{ y: 'calc(80vh - 165px)', x: 1500 }}
        />
      </Modal>
    </ConfigProvider>
  )
}

export default EventGraphTableDialog
