import { Button, Popconfirm, Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons'
import {
  deleteTelegramUser,
  getTelegramUser,
  telegramSelector
} from '../../../../../features/Preferences/telegramSlice'

const TelegramUserList = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector(telegramSelector)
  const columns = [
    {
      title: 'Telegram Name',
      dataIndex: 'telegramName',
      key: 'telegramName',
      width: 200,
      align: 'center'
    },
    {
      title: 'Telegram Type',
      dataIndex: 'telegramType',
      key: 'telegramType',
      width: 100,
      align: 'center'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete Congfirmation!"
            description="Are you sure want to delete user ？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record)}
            placement="top"
          >
            <Button
              type="primary"
              shape="circle"
              size="small"
              //onClick={() => handleDelete(record)}
              icon={<DeleteOutlined />}
              style={{ backgroundColor: 'red', borderColor: 'red' }}
            />
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleDelete = (record) => {
    dispatch(deleteTelegramUser(record))
  }

  useEffect(() => {
    dispatch(getTelegramUser())
  }, [])

  return (
    <Table
      rowKey="userId"
      columns={columns}
      dataSource={userData}
      size="small"
      pagination={{
        position: ['bottomRight'],
        showQuickJumper: true,
        size: 'small',
        total: userData.length,
        defaultPageSize: 5,
        pageSizeOptions: [5, 10, 15, 20],
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} `
      }}
    />
  )
}

export default TelegramUserList
