import { App, Button, Card, ConfigProvider, Modal, Space, Table, theme } from 'antd'
import React, { useEffect } from 'react'
import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteUserData,
  requestGetUsersData,
  setEditUserData,
  userManagementSelector
} from '../features/userManagementSlice'
import { openDialog } from '../features/dialogSlice'

const UserManagement = () => {
  const { useToken } = theme
  const { token } = useToken()
  const { modal } = App.useApp()
  const dispatch = useDispatch()
  const { loggedInUser, usersData } = useSelector(userManagementSelector)
  const { username, userType } = loggedInUser
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'User Type',
      dataIndex: 'userType',
      key: 'usertype'
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy'
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) =>
        userType === 'Admin' &&
        username !== record.username && (
          <Space size="middle">
            <Button
              type="primary"
              style={{ background: token.colorSuccess }}
              shape="circle"
              onClick={() => handleEdit(record)}
              icon={<EditOutlined />}
            />
            {record.username !== 'admin' && (
              <Button
                type="primary"
                danger={true}
                shape="circle"
                onClick={() => handleDelete(record.UserId)}
                icon={<DeleteOutlined />}
              />
            )}
          </Space>
        )
    }
  ]

  const handleAddUser = () => {
    dispatch(openDialog('addUser'))
  }

  const handleDelete = (values) => {
    //console.log(values)
    modal.confirm({
      title: 'Delete Confirmation',
      content: 'Are you sure you want to delete this user ?',
      okText: 'Delete',
      onOk: () => {
        dispatch(deleteUserData(values))
      }
    })
  }

  const handleEdit = (values) => {
    // console.log(values)
    dispatch(
      setEditUserData({
        UserId: values.UserId,
        username: values.username,
        password: values.password,
        userType: values.userType,
        createdBy: values.createdBy
      })
    )
    dispatch(openDialog('editUser'))
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(requestGetUsersData())
    }, 1000)
  }, [])

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
      <Card
        title="List of Users"
        bodyStyle={{ paddingTop: '5px', paddingBottom: '0px' }}
        data-testid="user-card"
        extra={
          <Button type="primary" icon={<UserAddOutlined />} ghost onClick={handleAddUser}>
            Add User
          </Button>
        }
      >
        <Table
          style={{ colorFillAlter: token.colorPrimaryBg }}
          rowKey="UserId"
          columns={columns}
          dataSource={usersData}
          size="middle"
          pagination={{
            position: ['bottomCenter'],
            showQuickJumper: true,
            size: 'default',
            total: usersData.length,
            defaultPageSize: 10,
            pageSizeOptions: [10, 15, 20, 25],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
        />
      </Card>
    </ConfigProvider>
  )
}

export default UserManagement
