import { createSlice } from '@reduxjs/toolkit'

const userManagementSlice = createSlice({
  name: 'usermgmtslice',
  initialState: {
    loggedInUser: {},
    usersData: []
  },
  reducers: {
    getLoginData: (state, { payload }) => {
      state.loggedInUser = { ...payload }
    },
    clearUsersData: (state, { payload }) => {
      state.loggedInUser = {}
      state.usersData = []
    }
  }
})

export const { getLoginData, clearUsersData } = userManagementSlice.actions

export const userManagementSelector = (state) => {
  const { loggedInUser, usersData } = state.userManagement
  return { loggedInUser, usersData }
}

export default userManagementSlice
