import { createSlice } from '@reduxjs/toolkit'
// import { openDialog } from '../features/dialogSlice'
import { openDialog } from './dialogSlice'
import {
  REQUEST_MP_SYSLOG_SETTING,
  RESPONSE_RP_SYSLOG_SETTING
} from '../../../main/utils/IPCEvents'
import { createSelector } from 'reselect'

const WAITING = 0
const SUCCESS = 1
const ERROR = 2

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

export const startTask = (param) => (dispatch, getState) => {
  // console.log(param)
  dispatch(setTaskRunning(true))
  const { deviceStatus } = getState().syslogSetting
  const devices = Object.keys(deviceStatus)
  //console.log(devices);
  window.electron.ipcRenderer.on(RESPONSE_RP_SYSLOG_SETTING, (event, arg) => {
    const { type } = arg
    if (type === 1) {
      //callback('There is some problem in  setting process.');
      dispatch(updateAllDeviceStatusError())
    } else {
      const { success } = arg
      const { MACAddress } = arg.data
      dispatch(updateDeviceStatus({ MACAddress, success }))
    }
    const { finish } = arg.data
    if (finish) {
      window.electron.ipcRenderer.removeAllListeners(RESPONSE_RP_SYSLOG_SETTING)
      // dispatch(setTaskRunning(false))
      dispatch(setTaskRunning(false))
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SYSLOG_SETTING, { devices, param: param })
  // console.log('param:', param)
}

const syslogSettingSlice = createSlice({
  name: 'syslogSettingSlice',
  initialState: {
    deviceStatus: {},
    isTaskRunning: false
  },
  reducers: {
    updateAllDeviceStatusError: (state) => {
      const deviceStatus = { ...state.deviceStatus }
      Object.keys(deviceStatus).forEach((MACAddress) => {
        deviceStatus[MACAddress].status = ERROR
      })
      return void { ...state, deviceStatus }
    },
    updateDeviceStatus: (state, { payload }) => {
      const { MACAddress, success } = payload
      const deviceStatus = { ...state.deviceStatus }
      //console.log(deviceStatus);
      //console.log(MACAddress);
      deviceStatus[MACAddress].status = success ? SUCCESS : ERROR
      return void { ...state, deviceStatus }
      // return {
      //   ...state,
      //   deviceStatus: {
      //     ...state.deviceStatus,
      //     [MACAddress]: {
      //       ...(state.deviceStatus[MACAddress].status = success ? SUCCESS : ERROR)
      //     }
      //   }
      // }
    },

    setTaskRunning: (state, action) => {
      return { ...state, isTaskRunning: action.payload }
    },
    initDeviceStatus: (state, action) => {
      const { deviceStatus } = action.payload
      return { ...state, deviceStatus }
    },
    clearData: (state, action) => {
      return { deviceStatus: {}, isTaskRunning: false }
    }
  }
})

export const {
  updateAllDeviceStatusError,
  updateDeviceStatus,
  setTaskRunning,
  clearData,
  initDeviceStatus
} = syslogSettingSlice.actions
const memoizedSyslogSettingSelector = (state) => state.syslogSetting
export const syslogSettingSelector = createSelector(
  memoizedSyslogSettingSelector,
  ({ deviceStatus, isTaskRunning }) => ({ deviceStatus, isTaskRunning })
)

export default syslogSettingSlice
