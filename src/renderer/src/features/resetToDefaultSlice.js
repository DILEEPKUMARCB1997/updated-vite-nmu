import { createSlice } from '@reduxjs/toolkit'
import {
  RESPONSE_RP_RESET_TO_DEFAULT,
  REQUEST_MP_RESET_TO_DEFAULT
} from '../../../main/utils/IPCEvents'
// import { openDialog } from '../features/dialogSlice'
import { openDialog } from './dialogSlice'

const WAITING = 0
const SUCCESS = 1
const ERROR = 2

const RUNNING = 1
const FINISH = 2
export const requestResetToDefault = () => (dispatch, getState) => {
  const devices = Object.keys(getState().resetToDefault.resetToDefaultStatus)
  devices.forEach((MACAddress) => {
    window.electron.ipcRenderer.once(
      `${RESPONSE_RP_RESET_TO_DEFAULT} ${MACAddress}`,
      (event, arg) => {
        dispatch(
          updateDevicesResetStatus({
            MACAddress,
            status: arg.success ? SUCCESS : ERROR
          })
        )
      }
    )
  })
  dispatch(updateResetTaskStatus(RUNNING))
  window.electron.ipcRenderer.send(REQUEST_MP_RESET_TO_DEFAULT, devices)
}
export const initResetToDefaultData = () => (dispatch, getState) => {
  const resetToDefaultStatus = {}

  const { defaultDeviceData, selected } = getState().discovery
  selected.forEach((MACAddress) => {
    resetToDefaultStatus[MACAddress] = {
      IPAddress: defaultDeviceData[MACAddress].IPAddress,
      model: defaultDeviceData[MACAddress].model,
      status: WAITING
    }
  })
  // dispatch({
  //   type: INIT_RESET_TO_DEFAULT_DATA,
  //   payload: { resetToDefaultStatus, waitingDeviceCount: selected.length }
  // })
  dispatch(initResetDefaultData({ resetToDefaultStatus, waitingDeviceCount: selected.length }))
  dispatch(openDialog('resetToDefault'))
}

const resetToDefaultSlice = createSlice({
  name: 'resetToDefaultSlice',
  initialState: {
    resetToDefaultStatus: {},
    taskStatus: WAITING,
    waitingDeviceCount: 0
  },
  reducers: {
    clearResetToDefaultData: (state) => {
      return {
        ...state,
        resetToDefaultStatus: {},
        taskStatus: WAITING,
        waitingDeviceCount: 0
      }
    },
    updateDevicesResetStatus: (state, action) => {
      const { MACAddress, status } = action.payload
      return {
        ...state,
        resetToDefaultStatus: {
          ...state.resetToDefaultStatus,
          [MACAddress]: {
            ...state.resetToDefaultStatus[MACAddress],
            status
          }
        },
        taskStatus: state.waitingDeviceCount === 1 ? FINISH : RUNNING,
        waitingDeviceCount: state.waitingDeviceCount - 1
      }
    },
    updateResetTaskStatus: (state, action) => {
      return {
        ...state,
        taskStatus: action.payload
      }
    },
    initResetDefaultData: (state, action) => {
      const { resetToDefaultStatus, waitingDeviceCount } = action.payload
      return {
        ...state,
        resetToDefaultStatus,
        waitingDeviceCount
      }
    }
  }
})
export const {
  clearResetToDefaultData,
  updateDevicesResetStatus,
  updateResetTaskStatus,
  initResetDefaultData
} = resetToDefaultSlice.actions

export const resetToDefaultSelector = (state) => {
  const { resetToDefaultStatus, taskStatus, waitingDeviceCount } = state.resetToDefault
  return { resetToDefaultStatus, taskStatus, waitingDeviceCount }
}
export default resetToDefaultSlice
