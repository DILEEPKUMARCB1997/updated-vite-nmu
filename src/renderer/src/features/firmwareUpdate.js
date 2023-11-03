import {
  REQUEST_MP_START_FIRMWARE_UPDATE,
  RESPONSE_RP_START_FIRMWARE_UPDATE,
  REQUEST_MP_OPEN_FILE_DIALOG,
  RESPONSE_RP_OPEN_FILE_DIALOG,
  REQUEST_MP_STOP_FIRMWARE_UPDATE,
  RESPONSE_RP_STOP_FIRMWARE_UPDATE
} from '../../../main/utils/IPCEvents'
import { openDialog } from '../features/dialogSlice'
import { createSlice } from '@reduxjs/toolkit'

export const requestStartFirmwareUpdate = () => (dispatch, getState) => {
  const sendData = getState().firmwareUpdate.deviceData
  window.electron.ipcRenderer.once(RESPONSE_RP_START_FIRMWARE_UPDATE, (event, arg) => {
    if (arg.success) {
      dispatch(changeFirmwareUpdateStatus(1))
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
export const initFirmwareUpdateData = () => (dispatch, getState) => {
  const { defaultDeviceData } = getState().discovery
  const { selected } = getState().discovery
  let deviceData = {}
  let deviceRealTimeData = {}
  selected.forEach((MACAddress) => {
    deviceData = {
      ...deviceData,
      [MACAddress]: {
        IPAddress: defaultDeviceData[MACAddress].IPAddress,
        model: defaultDeviceData[MACAddress].model
      }
    }
    deviceRealTimeData = {
      ...deviceRealTimeData,
      [MACAddress]: {
        uploadProgress: 0,
        code: 'none'
      }
    }
  })
  // dispatch({
  //   type: INIT_FIRMWARE_UPDATE_DATA,
  //   payload: {
  //     deviceData,
  //     deviceRealTimeData
  //   }
  // })
  dispatch(initFirmwareUpdate({ deviceData, deviceRealTimeData }))
  dispatch(openDialog('FWU'))
}
const codes = ['E007', 'E001', 'S002', 'c', 'TO']
export const updateFirmwareUpdateData = (deviceData) => (dispatch) => {
  dispatch(updateFirmwareUpdate(deviceData))
  if (codes.includes(deviceData.code)) {
    dispatch(addFirmWareFinishData(deviceData.MACAddress))
  }
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
    initFirmwareUpdate: (state, action) => {
      return {
        ...state,
        deviceRealTimeData: action.payload.deviceRealTimeData,
        deviceData: action.payload.deviceData
      }
    },
    updateFirmwareUpdate: (state, action) => {
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
    addFirmWareFinishData: (state, action) => {
      if (!state.FWUDoneDeviceData.includes(action.payload)) {
        return {
          ...state,
          FWUDoneDeviceData: [...state.FWUDoneDeviceData, action.payload]
        }
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
  updateFirmwareUpdate,
  initFirmwareUpdate,
  addFirmWareFinishData
} = firmwareSlice.actions
export const firmwareSelector = (state) => {
  const { FWUDoneDeviceData, deviceData, deviceRealTimeData, filePath, activeStep, status } =
    state.firmwareUpdate
  return { FWUDoneDeviceData, deviceData, deviceRealTimeData, filePath, activeStep, status }
}

export default firmwareSlice
