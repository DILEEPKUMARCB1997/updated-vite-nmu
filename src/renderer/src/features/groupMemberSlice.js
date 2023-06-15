import { createSlice } from '@reduxjs/toolkit'
import { openDialog } from './dialogSlice'

export const initGroupMemberData = (payload) => (dispatch, getState) => {
  let memberMACAddress = []
  let allDevice = []
  let memberKeys = []
  getState().discovery.groupDeviceArrayData[payload.groupId].forEach((element) => {
    memberMACAddress = [...memberMACAddress, element.MACAddress]
  })
  getState().discovery.defaultDeviceArrayData.forEach((element, index) => {
    allDevice = [...allDevice, { ...element, key: index.toString() }]
    if (memberMACAddress.includes(element.MACAddress)) {
      memberKeys = [...memberKeys, index.toString()]
    }
  })
  dispatch(
    initializeGroupMemberData({
      allDevice,
      memberKeys,
      groupName: payload.groupName,
      groupId: payload.groupId
    })
  )
  dispatch(openDialog('transferMember'))
}

const groupMemberSlice = createSlice({
  name: 'groupMemberSlice',
  initialState: {
    allDevice: [],
    memberKeys: [],
    groupName: '',
    groupId: ''
  },
  reducers: {
    initializeGroupMemberData: (state, { payload }) => {
      state.allDevice = payload.allDevice
      state.memberKeys = payload.memberKeys
      state.groupName = payload.groupName
      state.groupId = payload.groupId
    },
    transferMember: (state, { payload }) => {
      state.memberKeys = payload
    },
    clearGroupMemberData: (state, { payload }) => {
      state.allDevice = []
      state.memberKeys = []
      state.groupName = ''
      state.groupId = ''
    }
  }
})

export const { initializeGroupMemberData, transferMember, clearGroupMemberData } =
  groupMemberSlice.actions

export const groupMemberSelector = (state) => {
  const { allDevice, memberKeys, groupName, groupId } = state.groupMember
  return { allDevice, memberKeys, groupName, groupId }
}

export default groupMemberSlice
