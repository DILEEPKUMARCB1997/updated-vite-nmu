import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_DELETE_USER_DETAILS,
  REQUEST_MP_GET_USERS_DATA,
  REQUEST_MP_SET_USER_DETAILS,
  RESPONSE_RP_DELETE_USER_DETAILS,
  RESPONSE_RP_GET_USERS_DATA,
  RESPONSE_RP_SET_USER_DETAILS
} from '../../../main/utils/IPCEvents'
import { notification } from 'antd'

export const setUserData = (param) => (dispatch, getState) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_SET_USER_DETAILS, (event, arg) => {
    console.log(arg)
    if (arg.success) {
      console.log(arg.data)
      dispatch(requestGetUsersData())
      notification.success({ message: 'Successfully saved user data.' })
    } else {
      notification.error({ message: arg.msg })
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SET_USER_DETAILS, {
    UserId: param.UserId,
    username: param.username,
    password: param.password,
    userType: param.userType,
    createdBy: param.createdBy
  })
}

export const deleteUserData = (param) => (dispatch, getState) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_DELETE_USER_DETAILS, (event, arg) => {
    console.log(arg)
    if (arg.success) {
      dispatch(requestGetUsersData())
      notification.success({ message: 'Successfully deleted user data.' })
    } else {
      notification.error({ message: arg.msg })
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_DELETE_USER_DETAILS, {
    UserId: param
  })
}

export const requestGetUsersData = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_USERS_DATA, (event, arg) => {
    console.log(arg)
    if (arg.success) {
      const usersData = arg.data
      console.log(usersData)
      dispatch(getUsersData(usersData))
    } else {
      console.log('Error get users data')
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_USERS_DATA, {})
}

const userManagementSlice = createSlice({
  name: 'usermgmtSlice',
  initialState: {
    loggedInUser: {},
    usersData: [],
    editUserData: []
  },
  reducers: {
    getLoginData: (state, { payload }) => {
      state.loggedInUser = { ...payload }
    },
    getUsersData: (state, { payload }) => {
      return { ...state, usersData: payload }
    },
    setEditUserData: (state, { payload }) => {
      return { ...state, editUserData: payload }
    },
    clearUsersData: (state) => {
      state.loggedInUser = {}
      state.usersData = []
    }
  }
})

export const { getLoginData, clearUsersData, getUsersData, setEditUserData } =
  userManagementSlice.actions

export const userManagementSelector = (state) => {
  const { loggedInUser, usersData, editUserData } = state.userManagement
  return { loggedInUser, usersData, editUserData }
}

export default userManagementSlice
