/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import { App } from 'antd'
import {
  REQUEST_MP_GET_CONFIG_FILES,
  REQUEST_MP_GET_THE_SCHEDULE_BACKUP_DATA,
  REQUEST_MP_SET_THE_SCHEDULE_BACKUP_DATA,
  RESPONSE_RP_GET_CONFIG_FILES,
  RESPONSE_RP_GET_THE_SCHEDULE_BACKUP_DATA,
  RESPONSE_RP_SET_THE_SCHEDULE_BACKUP_DATA
} from '../../../main/utils/IPCEvents'
import _ from 'lodash'
import { openDialog } from './dialogSlice'

export const initScheduleBackup = () => (dispatch, getState) => {
  dispatch(openDialog('scheduleBackup'))
  dispatch(getScheduledData())
  dispatch(initDeviceStatus())
}
const { notification } = App.useApp
export const requestAddScheduleBackup = (param) => (dispatch, getState) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_SET_THE_SCHEDULE_BACKUP_DATA, (event, arg) => {
    if (arg.success) {
      notification.success({
        message: 'Schedule backup added successfully'
      })
    } else {
      notification.error({ message: arg.msg })
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SET_THE_SCHEDULE_BACKUP_DATA, {
    scheduleId: getState().scheduleBackup.scheduleId,
    scheduleName: param.scheduleName,
    frequency: param.frequency,
    scheduleDate: param.scheduleDate,
    scheduleTime: param.scheduleTime,
    weeekDay: param.weeekDay,
    customFrequency: param.customFrequency
  })
}

let deviceScheduleList = {}

export const getScheduledData = () => (dispatch) => {
  const scheduledBackup = {}
  const scheduledDeviceArrayData = {}
  const isEditMode = false
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_THE_SCHEDULE_BACKUP_DATA, (event, arg) => {
    //console.log(arg);
    if (arg.success) {
      deviceScheduleList = _.cloneDeep(arg.data)
      //console.log(deviceScheduleList);
      Object.keys(deviceScheduleList).forEach((scheduleId) => {
        scheduledBackup[scheduleId] = {
          scheduleId: deviceScheduleList[scheduleId].scheduleId,
          scheduleName: deviceScheduleList[scheduleId].scheduleName,
          frequency: deviceScheduleList[scheduleId].frequency,
          scheduleDate: deviceScheduleList[scheduleId].scheduleDate,
          scheduleTime: deviceScheduleList[scheduleId].scheduleTime,
          weeekDay: deviceScheduleList[scheduleId].weeekDay,
          customFrequency: deviceScheduleList[scheduleId].customFrequency
        }
        scheduledDeviceArrayData[scheduleId] = Object.values(
          deviceScheduleList[scheduleId].deviceList
        )
      })
      dispatch(setScheduledData({ scheduledBackup, scheduledDeviceArrayData }))
    } else {
      console.log('schedule backup error1')
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_THE_SCHEDULE_BACKUP_DATA, {})
}

export const getBackupFile = (param) => (dispatch) => {
  //console.log(param);
  if (param.MACAddress !== '') {
    window.electron.ipcRenderer.once(RESPONSE_RP_GET_CONFIG_FILES, (event, arg) => {
      const { files } = arg.data
      dispatch(setFiles({ files }))
    })
    window.electron.ipcRenderer.send(REQUEST_MP_GET_CONFIG_FILES, {
      MACAddress: param.MACAddress
    })
  }
}

const scheduleBackupSlice = createSlice({
  name: 'scheduleBackupSlice',
  initialState: {
    mode: 'backup',
    deviceStatus: {},
    selectDevice: '',
    isTaskRunning: false,
    isRestoreFinish: false,
    scheduledBackup: {},
    scheduledDeviceArrayData: {},
    isEditMode: false,
    scheduleId: '0',
    scheduleName: '',
    frequency: 0,
    scheduleDate: '',
    scheduleTime: '',
    weeekDay: 0,
    customFrequency: 0,
    files: []
  },
  reducers: {
    initDeviceStatus: (state) => {
      return state
    },
    setFiles: (state, { payload }) => {
      const { files } = payload
      return { ...state, files: files }
    },
    setEditMode: (state, { payload }) => {
      console.log(payload, deviceScheduleList[payload.scheduleId])
      return {
        ...state,
        isEditMode: payload.isEditMode,
        scheduleId: payload.scheduleId,
        scheduleName: deviceScheduleList[payload.scheduleId].scheduleName,
        frequency: deviceScheduleList[payload.scheduleId].frequency,
        scheduleDate: deviceScheduleList[payload.scheduleId].scheduleDate,
        scheduleTime: deviceScheduleList[payload.scheduleId].scheduleTime,
        weeekDay: deviceScheduleList[payload.scheduleId].weeekDay,
        customFrequency: deviceScheduleList[payload.scheduleId].customFrequency
      }
    },
    setScheduledData: (state, { payload }) => {
      const { scheduledBackup, scheduledDeviceArrayData } = payload
      return { ...state, scheduledBackup, scheduledDeviceArrayData }
    },
    clearData: (state) => {
      return {
        ...state,
        mode: 'backup',
        deviceStatus: {},
        selectDevice: '',
        isTaskRunning: false,
        isEditMode: false,
        scheduleId: '0',
        scheduleName: '',
        frequency: 0,
        scheduleDate: '',
        scheduleTime: '',
        weeekDay: 0,
        customFrequency: 0
      }
    },
    cancelClick: (state) => {
      return {
        ...state,
        isEditMode: false,
        scheduleId: '0',
        scheduleName: '',
        frequency: 0,
        scheduleDate: '',
        scheduleTime: '',
        weeekDay: 0,
        customFrequency: 0
      }
    }
  }
})

export const {
  setEditMode,
  setFiles,
  cancelClick,
  initDeviceStatus,
  setScheduledData,
  initializeScheduleMemberData,
  clearData
} = scheduleBackupSlice.actions

export const scheduleBackupSelector = (state) => {
  const {
    mode,
    deviceStatus,
    selectDevice,
    isTaskRunning,
    isRestoreFinish,
    scheduledBackup,
    scheduledDeviceArrayData,
    isEditMode,
    scheduleId,
    scheduleName,
    frequency,
    scheduleDate,
    scheduleTime,
    weeekDay,
    customFrequency,
    files
  } = state.scheduleBackup
  return {
    mode,
    deviceStatus,
    selectDevice,
    isTaskRunning,
    isRestoreFinish,
    scheduledBackup,
    scheduledDeviceArrayData,
    isEditMode,
    scheduleId,
    scheduleName,
    frequency,
    scheduleDate,
    scheduleTime,
    weeekDay,
    customFrequency,
    files
  }
}

export default scheduleBackupSlice
