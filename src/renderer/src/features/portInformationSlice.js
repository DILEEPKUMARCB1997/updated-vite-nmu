import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_PORT_INFORMATION,
  REQUEST_MP_GET_POWER_STATUS,
  REQUEST_MP_SET_PORT_LINK_STATUS,
  RESPONSE_RP_SET_PORT_LINK_STATUS
} from '../../../main/utils/IPCEvents'
import { openDialog } from './dialogSlice'
import { createSelector } from 'reselect'

const XAXES_LABELS_NUM = 13
const XAXES_INTERVAL_NUM = XAXES_LABELS_NUM - 1

export const initPortInfoData = (payload) => (dispatch, getState) => {
  const { MACAddress } = payload

  const { model, IPAddress, kernel, ap } = getState().discovery.defaultDeviceData[MACAddress]

  dispatch(setModelInfo({ model, IPAddress, MACAddress, kernel, ap }))
  dispatch(openPortInfoDrawer(true), dispatch(openDialog('portInformation')))
  dispatch(startPortStatusPolling())
}

export const requestGetPortAndPowerStatus = () => (dispatch, getState) => {
  const { MACAddress } = getState().portInformation
  window.electron.ipcRenderer.send(REQUEST_MP_GET_PORT_INFORMATION, { MACAddress })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_POWER_STATUS, { MACAddress })
}

export const requestSetPortStatus = (portStatus) => (dispatch, getState) => {
  dispatch(addPortSwitchLoading(portStatus.portName))
  window.electron.ipcRenderer.once(RESPONSE_RP_SET_PORT_LINK_STATUS, (event, arg) => {
    //console.log(arg);
    if (arg.success) {
      dispatch(setPortEnableStatus(portStatus))
    }
    dispatch(removePortSwitchLoading(portStatus.portName))
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SET_PORT_LINK_STATUS, {
    MACAddress: getState().portInformation.MACAddress,
    portName: portStatus.portName,
    linkStatus: portStatus.checked ? 1 : 2
  })
}

const portInformationSlice = createSlice({
  name: 'portInformationSlice',
  initialState: {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
    trigger: false,
    isWaiting: false,
    MACAddress: '',
    isPolling: false,
    modelInfo: {},
    portStatusData: {},
    powerStatusData: {},
    trafficBuffer: {},
    intervalBuffer: [],
    switchLoadings: [],
    viewWhichPort: 'Port1',
    upTime: 0,
    drawerVisible: false
  },
  reducers: {
    openPortInfoDrawer: (state, { payload }) => {
      // console.log(payload)
      return { ...state, drawerVisible: payload }
    },
    setModelInfo: (state, { payload }) => {
      const { MACAddress } = payload
      return { ...state, modelInfo: payload, MACAddress }
    },
    startPortStatusPolling: (state, { payload }) => {
      return { ...state, isPolling: true }
    },
    setPortEnableStatus: (state, { payload }) => {
      const { portName, checked } = payload
      return {
        ...state,
        portStatusData: {
          ...state.portStatusData,
          [portName]: { ...state.portStatusData[portName], enableStatus: checked ? 1 : 2 }
        }
      }
    },
    removePortSwitchLoading: (state, { payload }) => {
      return {
        ...state,
        switchLoadings: state.switchLoadings.filter((el) => el !== payload)
      }
    },
    addPortSwitchLoading: (state, { payload }) => {
      return {
        ...state,
        switchLoadings: [...state.switchLoadings, payload]
      }
    },
    updatePortStatusData: (state, { payload }) => {
      let firstRound = true
      let newTrafficBuffer = {}
      const { labels } = state
      const newIntervalBuffer = [...state.intervalBuffer]
      const { upTime } = payload
      Object.entries(payload.portInfo).forEach(([portName, portData]) => {
        const oldPortBuffer = state.trafficBuffer[portName]
        if (portData.enableStatus === 1 && portData.portStatus === 'up') {
          if (oldPortBuffer === undefined) {
            newTrafficBuffer = {
              ...newTrafficBuffer,
              [portName]: {
                inBuffer: [],
                outBuffer: [],
                tempIn: portData.inOctets,
                tempOut: portData.outOctets
              }
            }
          } else {
            firstRound = false
            let interval = upTime - state.upTime
            if (state.upTime === 0) {
              interval = 300
            }
            const newInData =
              oldPortBuffer.tempIn === ''
                ? 0
                : Math.round(((portData.inOctets - oldPortBuffer.tempIn) / interval) * 100)
            const newOutData =
              oldPortBuffer.tempOut === ''
                ? 0
                : Math.round(((portData.outOctets - oldPortBuffer.tempOut) / interval) * 100)
            const inBuffer = [...oldPortBuffer.inBuffer, newInData]
            const outBuffer = [...oldPortBuffer.outBuffer, newOutData]
            if (inBuffer.length > 1) {
              newIntervalBuffer.push(interval)
            }
            if (inBuffer.length > XAXES_LABELS_NUM) {
              inBuffer.shift()
            }
            if (outBuffer.length > XAXES_LABELS_NUM) {
              outBuffer.shift()
            }
            if (newIntervalBuffer.length > XAXES_INTERVAL_NUM) {
              newIntervalBuffer.shift()
            }
            newTrafficBuffer = {
              ...newTrafficBuffer,
              [portName]: {
                inBuffer,
                outBuffer,
                tempIn: portData.inOctets,
                tempOut: portData.outOctets
              }
            }
          }
        }
      })
      return {
        ...state,
        intervalBuffer: newIntervalBuffer,
        labels: creatTrafficLables(labels, newIntervalBuffer, firstRound),
        portStatusData: payload.portInfo,
        trafficBuffer: newTrafficBuffer,
        isWaiting: false,
        upTime
      }
    },
    updatePowerStatusData: (state, { payload }) => {
      return { ...state, powerStatusData: payload }
    },
    waitForPortStatusData: (state, { payload }) => {
      const { labels } = state
      let newTrafficBuffer = {}
      const newIntervalBuffer = [...state.intervalBuffer]
      Object.entries(state.trafficBuffer).forEach(([portName, portData]) => {
        const inBuffer = [...portData.inBuffer, 0]
        const outBuffer = [...portData.outBuffer, 0]
        if (inBuffer.length > XAXES_LABELS_NUM) {
          inBuffer.shift()
        }
        if (outBuffer.length > XAXES_LABELS_NUM) {
          outBuffer.shift()
        }
        newTrafficBuffer = {
          ...newTrafficBuffer,
          [portName]: {
            inBuffer,
            outBuffer,
            tempIn: '',
            tempOut: ''
          }
        }
      })
      newIntervalBuffer.push(300)
      if (newIntervalBuffer.length > XAXES_INTERVAL_NUM) {
        newIntervalBuffer.shift()
      }
      return {
        ...state,
        labels: creatTrafficLables(labels, newIntervalBuffer, false),
        intervalBuffer: newIntervalBuffer,
        trafficBuffer: newTrafficBuffer,
        isWaiting: true,
        trigger: !state.trigger,
        upTime: 0
      }
    },
    clearPortInfoData: () => {
      return {
        intervalBuffer: [],
        trigger: false,
        isWaiting: false,
        MACAddress: '',
        isPolling: false,
        modelInfo: {},
        portStatusData: {},
        powerStatusData: {},
        trafficBuffer: {},
        switchLoadings: [],
        viewWhichPort: 'Port1',
        upTime: 0,
        checkingSNMP: false,
        labels: ['', '', '', '', '', '', '', '', '', '', '', '', '']
      }
    }
  }
})

export const {
  setModelInfo,
  startPortStatusPolling,
  updatePortStatusData,
  setPortEnableStatus,
  clearPortInfoData,
  waitForPortStatusData,
  updatePowerStatusData,
  openPortInfoDrawer,
  removePortSwitchLoading,
  addPortSwitchLoading
} = portInformationSlice.actions
const memoizedPortInformationSelector = (state) => state.portInformation
export const portInformationSelector = createSelector(
  memoizedPortInformationSelector,
  ({
    labels,
    trigger,
    isWaiting,
    MACAddress,
    isPolling,
    modelInfo,
    portStatusData,
    powerStatusData,
    trafficBuffer,
    intervalBuffer,
    switchLoadings,
    viewWhichPort,
    upTime,
    drawerVisible
  }) => ({
    labels,
    trigger,
    isWaiting,
    MACAddress,
    isPolling,
    modelInfo,
    portStatusData,
    powerStatusData,
    trafficBuffer,
    intervalBuffer,
    switchLoadings,
    viewWhichPort,
    upTime,
    drawerVisible
  })
)

export default portInformationSlice

const creatTrafficLables = (labels, newIntervalBuffer, firstRound) => {
  const tempLabels = ['', '', '', '', '', '', '', '', '', '', '', '', '']
  if (firstRound) return tempLabels
  if (labels[0] === '0') {
    tempLabels[0] = 0
  } else {
    let currentIndex = labels.indexOf(0)
    if (currentIndex < XAXES_LABELS_NUM - 1) {
      tempLabels[currentIndex + 1] = 0
    } else {
      tempLabels[currentIndex] = 0
      currentIndex -= 1
    }
    for (let i = currentIndex; i >= 0; i -= 1) {
      tempLabels[i] = tempLabels[i + 1] + newIntervalBuffer[i]
    }
  }
  return tempLabels
}
