import { Table } from 'antd'
import React from 'react'

const TelegramUserList = () => {
  const columns = [
    {
      title: 'Telegram Name',
      dataIndex: 'telegramName',
      key: 'telegramName',
      width: 200
    },
    {
      title: 'Telegram Type',
      dataIndex: 'telegramType',
      key: 'telegramType',
      width: 200
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 60
    }
  ]
  return (
    <Table
      rowKey="userId"
      columns={columns}
      // dataSource={dataSource}
      size="small"
      pagination={{
        position: ['bottomRight'],
        showQuickJumper: true,
        size: 'default',
        // total: dataSource.length,
        defaultPageSize: 5,
        pageSizeOptions: [5, 10, 15, 20],
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
      }}
    />
  )
}

export default TelegramUserList
