import React, { useEffect, useState } from 'react'
import { ConfigProvider, Modal, Table, theme } from 'antd'
import { dashboardSelector } from '../../../features/dashboardSlice'
import { useSelector } from 'react-redux'

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

const SyslogGraphTableDialog = ({ onClose }) => {
  const { useToken } = theme
  const { token } = useToken()
  const [tableLoading, setTableLoading] = useState(true)

  const { syslogTableData } = useSelector(dashboardSelector)
  // console.log(syslogTableData)

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
        title="Syslog Graph Data"
        onOk={onClose}
        closable={true}
        maskClosable={false}
        style={{ top: 20 }}
        bodyStyle={{
          // height: 'calc(70vh - 150px)',
          margin: 0,
          paddingTop: 10,
          paddingBottom: '10px'
          // maxHeight: '98%'
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
          role="table"
          loading={tableLoading}
          rowKey="syslogId"
          bordered
          columns={columns}
          dataSource={syslogTableData}
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

export default SyslogGraphTableDialog
