/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal, Select, notification } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  requestGetUsersData,
  setUserData,
  userManagementSelector
} from '../../../features/userManagementSlice'
import {
  REQUEST_MP_SET_USER_DETAILS,
  RESPONSE_RP_SET_USER_DETAILS
} from '../../../../../main/utils/IPCEvents'

const AddUserDialog = ({ onClose }) => {
  const passwordPattern =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@%&? "])[a-zA-Z0-9!#$@%&?]{8,20}$/

  const { loggedInUser, usersData } = useSelector(userManagementSelector)

  const { username, userType } = loggedInUser
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  // const setUserData = (param) => (dispatch, getState) => {
  //   window.electron.ipcRenderer.once(RESPONSE_RP_SET_USER_DETAILS, (event, arg) => {
  //     console.log(arg)
  //     if (arg.success) {
  //       console.log(arg.data)
  //       dispatch(requestGetUsersData())
  //       notification.success({ message: 'Successfully saved user data.' })
  //     } else {
  //       notification.error({ message: arg.msg })
  //     }
  //   })
  //   window.electron.ipcRenderer.send(REQUEST_MP_SET_USER_DETAILS, {
  //     UserId: param.UserId,
  //     username: param.username,
  //     password: param.password,
  //     userType: param.userType,
  //     createdBy: username
  //   })
  // }

  const handleAddUserSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values)
        if (usersData.length >= 10) {
          notification.error({ message: 'Max no. of user already registered !' })
          form.resetFields()
          onClose()
          return
        }
        const usernames = usersData.map((el) => el.username)
        if (usernames.includes(values.username)) {
          notification.error({ message: 'username already exists !' })
          form.resetFields()
          onClose()
          return
        }
        const userData = {
          UserId: '0',
          username: values.username,
          password: values.password,
          userType: values.role,
          createdBy: username
        }
        dispatch(setUserData(userData))
        // notification.success({ message: 'Successfully saved user data.' })
        form.resetFields()
        onClose()
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo)
      })
  }

  return userType === 'Admin' ? (
    <Modal title="Add New User" open onOk={handleAddUserSubmit} onCancel={onClose} okText="Save">
      <Form form={form} layout="vertical" name="form_in_modal_user">
        {/* add user name */}
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input the username!'
            }
          ]}
        >
          {/* <Input disabled={isEdit} /> */}
          <Input placeholder="Enter Username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input the password!'
            },
            {
              pattern: passwordPattern,
              message:
                'password must have 8-20 characters, at least one uppercase one lowercase one digit one special character'
            }
          ]}
        >
          <Input.Password placeholder="Enter Password" />
        </Form.Item>
        {/* add select of role has admin, superuser, user */}
        <Form.Item
          name="role"
          label="Role"
          // initialValue={editUserData.role}
          rules={[
            {
              required: true,
              message: 'Please select the role!'
            }
          ]}
        >
          <Select
            placeholder="Select your role"
            options={[
              { value: 'Admin', label: 'Admin' },
              { value: 'Supervisor', label: 'Supervisor' },
              { value: 'Operator', label: 'Operator' }
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  ) : (
    <Modal
      title="Supervisors and Operators are not allowed to create user"
      open
      onOk={onClose}
      onCancel={onClose}
      okButtonProps={{
        style: {
          alignContent: 'center'
        }
      }}
      cancelButtonProps={{
        style: {
          display: 'none'
        }
      }}
    ></Modal>
  )
}

export default AddUserDialog
