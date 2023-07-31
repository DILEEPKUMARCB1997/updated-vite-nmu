import { createSlice } from '@reduxjs/toolkit'
import { openDialog } from './dialogSlice'

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
    }
  }
})

export const { initDeviceStatus, clearData } = syslogSettingSlice.actions
export const syslogSettingSelector = (state) => {
  const { deviceStatus, isTaskRunning } = state.syslogSetting
  return { deviceStatus, isTaskRunning }
}

export default syslogSettingSlice
