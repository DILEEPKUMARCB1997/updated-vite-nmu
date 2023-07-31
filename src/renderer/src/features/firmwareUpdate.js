import {
  REQUEST_MP_START_FIRMWARE_UPDATE,
  RESPONSE_RP_START_FIRMWARE_UPDATE,
  REQUEST_MP_OPEN_FILE_DIALOG,
  RESPONSE_RP_OPEN_FILE_DIALOG,
  REQUEST_MP_STOP_FIRMWARE_UPDATE,
  RESPONSE_RP_STOP_FIRMWARE_UPDATE
} from '../../../main/utils/IPCEvents'
import { createSlice } from '@reduxjs/toolkit'
export const codes = {
  none: { type: 'normal', label: 'Waiting' },
  a: { type: 'normal', label: 'Upload Image' },
  c: { type: 'normal', label: 'User Cancel' },
  S001: { type: 'normal', label: 'Erasing' },
  S002: { type: 'success', label: 'Update Successful' },
  E001: { type: 'error', label: 'Upload Fail(E001)' },
  E007: { type: 'error', label: 'Upload Fail(E007)' },
  TO: { type: 'error', label: 'Connect Timeout' }
}
export const requestStartFirmwareUpdate = () => (dispatch, getState) => {
  const sendData = getState().firmwareUpdate
  window.electron.ipcRenderer.once(RESPONSE_RP_START_FIRMWARE_UPDATE, (event, arg) => {
    if (arg.success) {
      dispatch({ type: changeFirmwareUpdateStatus, payload: 1 })
    }
  })
  window.electron.ipcRenderer.send(
    REQUEST_MP_START_FIRMWARE_UPDATE,
    JSON.stringify({
      deviceList: sendData
    })
  )
}

export const requestStopFirmwareUpdate = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_STOP_FIRMWARE_UPDATE, (event, arg) => {
    if (arg.success) {
      dispatch({ type: changeFirmwareUpdateStatus, payload: 2 })
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_STOP_FIRMWARE_UPDATE)
}

export const requestOpenFile = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_OPEN_FILE_DIALOG, (event, arg) => {
    dispatch(setFirmWareUpdateFilePath(arg.data[0]))
  })
  window.electron.ipcRenderer.send(REQUEST_MP_OPEN_FILE_DIALOG)
}
const statusStep = ['wait', 'start', 'done']
const firmwareSlice = createSlice({
  name: 'firmwareSlice',
  initialState: {
    FWUDoneDeviceData: [],
    deviceData: {},
    deviceRealTimeData: {},
    filePath: '',
    activeStep: 0,
    status: 'wait'
  },

  reducers: {
    setFirmWareUpdateFilePath: (state, action) => {
      return {
        ...state,
        filePath: action.payload
      }
    },
    initFirmwareUpdateData: (state, action) => {
      return {
        ...state,
        deviceRealTimeData: action.payload.deviceRealTimeData,
        deviceData: action.payload.deviceData
      }
    },
    updateFirmwareUpdateData: (state, action) => {
      return {
        ...state,
        deviceRealTimeData: {
          ...state.deviceRealTimeData,
          [action.payload.MACAddress]: {
            uploadProgress: action.payload.uploadProgress,
            code: action.payload.code
          }
        }
      }
    },
    changeFirmwareUpdateStatus: (state, action) => {
      return {
        ...state,
        activeStep: action.payload,
        status: statusStep[action.payload]
      }
    },
    clearFirmwareUpdateData: () => {
      return {
        FWUDoneDeviceData: [],
        deviceData: {},
        deviceRealTimeData: {},
        filePath: '',
        activeStep: 0,
        status: 'wait'
      }
    }
  }
})

export const {
  setFirmWareUpdateFilePath,
  changeFirmwareUpdateStatus,
  clearFirmwareUpdateData,
  updateFirmwareUpdateData,
  initFirmwareUpdateData
} = firmwareSlice.actions
export const firmwareSelector = (state) => {
  const { FWUDoneDeviceData, deviceData, deviceRealTimeData, filePath, activeStep, status } =
    state.firmware
  return { FWUDoneDeviceData, deviceData, deviceRealTimeData, filePath, activeStep, status }
}

export default firmwareSlice
