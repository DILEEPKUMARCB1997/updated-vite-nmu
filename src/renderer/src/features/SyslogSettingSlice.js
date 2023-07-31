import { createSlice } from '@reduxjs/toolkit'
import { openDialog } from './dialogSlice'
import {
  REQUEST_MP_SYSLOG_SETTING,
  RESPONSE_RP_SYSLOG_SETTING
} from '../../../main/utils/IPCEvents'

const WAITING = 0
const SUCCESS = 1
const ERROR = 2

export const startTask = (param) => (dispatch, getState) => {
  //console.log(param);
  dispatch(setTaskRunning(true))
  const { deviceStatus } = getState().syslogSetting
  const devices = Object.keys(deviceStatus)
  //console.log(devices);
  window.electron.ipcRenderer.on(RESPONSE_RP_SYSLOG_SETTING, (event, arg) => {
    const { type } = arg
    if (type === 1) {
      //callback('There is some problem in syslog setting process.');
      dispatch(updateAllDeviceStatusError())
    } else {
      const { success } = arg
      const { MACAddress } = arg.data
      dispatch(updateDeviceStatus({ MACAddress, success }))
    }
    const { finish } = arg.data
    if (finish) {
      window.electron.ipcRenderer.removeAllListeners(RESPONSE_RP_SYSLOG_SETTING)
      dispatch(setTaskRunning(false))
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SYSLOG_SETTING, { devices, param: param })
}

export const initSyslogSettingData = () => (dispatch, getState) => {
  const deviceStatus = {}
  const { defaultDeviceData, selected } = getState().discovery

  selected.forEach((MACAddress) => {
    deviceStatus[MACAddress] = {
      IPAddress: defaultDeviceData[MACAddress].IPAddress,
      model: defaultDeviceData[MACAddress].model,
      status: WAITING
    }
  })

  dispatch(initDeviceStatus({ deviceStatus }))
  dispatch(openDialog('syslogSetting'))
}

export const syslogSettingSlice = createSlice({
  name: 'syslogSettingSlice',
  initialState: {
    deviceStatus: {},
    isTaskRunning: false
  },
  reducers: {
    initDeviceStatus: (state, action) => {
      const { deviceStatus } = action.payload
      return { ...state, deviceStatus }
    },
    clearData: () => {
      return { deviceStatus: {}, isTaskRunning: false }
    },
    setTaskRunning: (state, action) => {
      return { ...state, isTaskRunning: action.payload }
    },
    updateDeviceStatus: (state, action) => {
      const { MACAddress, success } = action.payload
      const deviceStatus = { ...state.deviceStatus }
      deviceStatus[MACAddress].status = success ? SUCCESS : ERROR
      return { ...state, deviceStatus }
    },
    updateAllDeviceStatusError: (state, { payload }) => {
      const deviceStatus = { ...state.deviceStatus }
      Object.keys(deviceStatus).forEach((MACAddress) => {
        deviceStatus[MACAddress].status = ERROR
      })
      return { ...state, deviceStatus }
    }
  }
})

export const {
  initDeviceStatus,
  clearData,
  setTaskRunning,
  updateDeviceStatus,
  updateAllDeviceStatusError
} = syslogSettingSlice.actions
export const syslogSettingSelector = (state) => {
  const { deviceStatus, isTaskRunning } = state.syslogSetting
  return { deviceStatus, isTaskRunning }
}

export default syslogSettingSlice
