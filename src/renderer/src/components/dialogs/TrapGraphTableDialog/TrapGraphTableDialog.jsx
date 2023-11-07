import { ConfigProvider, Modal, Table, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelector } from '../../../features/dashboardSlice'

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

function TrapGraphTableDialog({ onClose }) {
  const { useToken } = theme
  const { token } = useToken()
  const [tableLoading, setTableLoading] = useState(true)
  const { trapTableData } = useSelector(dashboardSelector)
  // console.log('trap table data', trapTableData)

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
        title="Trap Graph Data"
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
          loading={tableLoading}
          rowKey="trapId"
          bordered
          columns={columns}
          dataSource={trapTableData}
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

export default TrapGraphTableDialog
