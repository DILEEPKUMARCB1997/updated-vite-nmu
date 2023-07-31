import { createSlice } from '@reduxjs/toolkit'
import { getScheduledData } from './scheduleBackupSlice'
import { notification } from 'antd'
import {
  REQUEST_MP_DELETE_SCHEDULE,
  RESPONSE_RP_DELETE_SCHEDULE
} from '../../../main/utils/IPCEvents'

export const initScheduleMemberData = (payload) => (dispatch, getState) => {
  let memberMACAddress = []
  let allDevice = []
  let memberKeys = []
  getState().scheduleBackup.scheduledDeviceArrayData[payload.scheduleId].forEach((element) => {
    memberMACAddress = [...memberMACAddress, element.MACAddress]
  })
  getState().discovery.defaultDeviceArrayData.forEach((element, index) => {
    allDevice = [...allDevice, { ...element, key: index.toString() }]
    if (memberMACAddress.includes(element.MACAddress)) {
      memberKeys = [...memberKeys, index.toString()]
    }
  })
  dispatch(
    initializeScheduleMemberData({
      allDevice,
      memberKeys,
      scheduleName: payload.scheduleName,
      scheduleId: payload.scheduleId
    })
  )
}

export const deleteSchedule = (param) => (dispatch, getState) => {
  //console.log(param);
  window.electron.ipcRenderer.once(RESPONSE_RP_DELETE_SCHEDULE, (event, arg) => {
    if (arg.success) {
      dispatch(getScheduledData())
      notification.success({ message: arg.msg })
    } else {
      notification.error({ message: arg.msg })
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_DELETE_SCHEDULE, {
    scheduleId: param.scheduleId
  })
}

const scheduleBackupMemberSlice = createSlice({
  name: 'scheduleBackupMemberSlice',
  initialState: {
    allDevice: [],
    memberKeys: [],
    scheduleName: '',
    scheduleId: ''
  },
  reducers: {
    initializeScheduleMemberData: (state, { payload }) => {
      return {
        ...state,
        allDevice: payload.allDevice,
        memberKeys: payload.memberKeys,
        scheduleName: payload.scheduleName,
        scheduleId: payload.scheduleId
      }
    }
  }
})

export const { initializeScheduleMemberData } = scheduleBackupMemberSlice.actions

export const scheduleBackupMemberSelector = (state) => {
  const { allDevice, memberKeys, scheduleName, scheduleId } = state.scheduleBackupMember
  return { allDevice, memberKeys, scheduleName, scheduleId }
}

export default scheduleBackupMemberSlice
