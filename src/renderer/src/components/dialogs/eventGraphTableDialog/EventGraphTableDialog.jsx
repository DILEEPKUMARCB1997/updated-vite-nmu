import React, { useEffect, useState } from 'react'
import { ConfigProvider, Modal, Table, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelector } from '../../../features/dashboardSlice'

const EventGraphTableDialog = ({ onClose }) => {
  const { useToken } = theme
  const { token } = useToken()
  const [tableLoading, setTableLoading] = useState(true)
  const { customTableData } = useSelector(dashboardSelector)
  console.log(customTableData)

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

  useEffect(() => {
    setTableLoading(false)
  }, [])

  const handleCloseButtonOnClick = () => {
    dispatch(onClose())
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
        title="Event Graph Data"
        open
        onOk={onClose}
        closable={true}
        maskClosable={false}
        onCancel={handleCloseButtonOnClick}
        width="90%"
        style={{ top: 20 }}
        bodyStyle={{
          margin: 0,
          paddingTop: 10,
          paddingBottom: '10px'
        }}
        footer={null}
      >
        <Table
          loading={tableLoading}
          rowKey="EventId"
          bordered
          columns={columns}
          dataSource={customTableData}
          pagination={{
            size: 'default',
            defaultPageSize: 25,
            pageSizeOptions: [25, 50, 75, 100],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
          scroll={{ y: 'calc(80vh - 165px)', x: 1500 }}
          rowClassName={(record) => {
            if (record.Severity === 'information') return 'table-information'
            if (record.Severity === 'warning') return 'table-warning'
            if (record.Severity === 'critical') return 'table-critical'
            return ''
          }}
        />
      </Modal>
    </ConfigProvider>
  )
}

export default EventGraphTableDialog
