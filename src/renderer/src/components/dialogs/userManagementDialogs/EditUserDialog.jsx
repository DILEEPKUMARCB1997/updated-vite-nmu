/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Form, Input, Modal, Select, notification } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData, userManagementSelector } from '../../../features/userManagementSlice'

const EditUserDialog = ({ onClose }) => {
  const dispatch = useDispatch()
  const { loggedInUser, usersData, editUserData } = useSelector(userManagementSelector)
  console.log(editUserData)
  const [form] = Form.useForm()
  const passwordPattern =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@%&? "])[a-zA-Z0-9!#$@%&?]{8,20}$/

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values)
      if (values.old !== '') {
        if (editUserData.password !== values.oldPassword) {
          notification.error({ message: 'Old password not matched' })
          form.resetFields()
          onClose()
        } else {
          let updateUser = {
            UserId: editUserData.UserId,
            username: editUserData.username,
            password: values.newPassword !== '' ? values.newPassword : editUserData.password,
            userType: values.userType !== '' ? values.role : editUserData.userType,
            createdBy: editUserData.createdBy
          }
          if (updateUser.username === 'admin') {
            if (updateUser.userType !== 'Admin') {
              notification.error({ message: 'Can not change role for admin' })
              form.resetFields()
            } else {
              dispatch(setUserData(updateUser))
              // notification.success({ message: 'User has been updated Successfully' })
              form.resetFields()
            }
          } else {
            console.log(updateUser)
            dispatch(setUserData(updateUser))
            // notification.success({ message: 'User has been updated Successfully' })
            form.resetFields()
          }
        }
      }
      onClose()
    })
  }
  return (
    <Modal title="Edit User" open onOk={handleOk} onCancel={onClose} okText="Edit">
      <Form form={form} layout="vertical" name="form_in_modal_user">
        {/* add user name */}
        <Form.Item
          name="username"
          label="Username"
          initialValue={editUserData.username}
          rules={[
            {
              required: true,
              message: 'Please input the username!'
            }
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="oldPassword"
          label="Old Password"
          // initialValue={editUserData.password}
          rules={[
            {
              required: true,
              message: 'Please input the old password!'
            }
          ]}
        >
          <Input.Password placeholder="Enter Old Password" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: 'Please input the new password!'
            },
            {
              pattern: passwordPattern,
              message:
                'password must have 8-20 characters, at least one uppercase one lowercase one digit one special character'
            }
          ]}
        >
          <Input.Password placeholder="Enter New Password" />
        </Form.Item>
        {/* add select of role has admin, superuser, user */}
        <Form.Item
          name="role"
          label="Role"
          initialValue={editUserData.userType}
          rules={[
            {
              required: true,
              message: 'Please select the role!'
            }
          ]}
        >
          <Select
            options={[
              { value: 'Admin', label: 'Admin' },
              { value: 'Supervisor', label: 'Supervisor' },
              { value: 'Operator', label: 'Operator' }
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditUserDialog
