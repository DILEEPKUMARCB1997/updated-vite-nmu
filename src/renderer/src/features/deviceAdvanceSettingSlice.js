import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_ALARM_SETTINGS,
  REQUEST_MP_GET_DEVICE_AUTHENTICATION_SETTINGS,
  REQUEST_MP_GET_DEVICE_COMMUNITY_SETTINGS,
  REQUEST_MP_SET_DEVICE_ALARM_SETTINGS,
  REQUEST_MP_SET_DEVICE_AUTHENTICATION_SETTINGS,
  REQUEST_MP_SET_DEVICE_COMMUNITY_SETTINGS,
  RESPONSE_RP_GET_ALARM_SETTINGS,
  RESPONSE_RP_GET_DEVICE_AUTHENTICATION_SETTINGS,
  RESPONSE_RP_GET_DEVICE_COMMUNITY_SETTINGS,
  RESPONSE_RP_SET_DEVICE_ALARM_SETTINGS,
  RESPONSE_RP_SET_DEVICE_AUTHENTICATION_SETTINGS,
  RESPONSE_RP_SET_DEVICE_COMMUNITY_SETTINGS
} from '../../../main/utils/IPCEvents'
import { openDialog } from './dialogSlice'
import { createSelector } from 'reselect'

export const clearDeviceAdvancedData = () => (dispatch) => {
  dispatch(openAdvanceDrawer(false))
  setTimeout(() => {
    dispatch(clearData())
  }, 200)
}

export const requireSaveDeviceAdvanced = (callback) => (dispatch, getState) => {
  const {
    MACAddress,
    SNMPVersion,
    readCommunity,
    writeCommunity,
    username,
    password,
    portInfo,
    powerInfo
  } = getState().deviceAdvanceSetting

  window.electron.ipcRenderer.once(RESPONSE_RP_SET_DEVICE_COMMUNITY_SETTINGS, (event, arg) => {
    if (!arg.success) {
      callback(false, 'SNMP community settings save fail!')
    }
    window.electron.ipcRenderer.send(REQUEST_MP_SET_DEVICE_AUTHENTICATION_SETTINGS, {
      MACAddress,
      username,
      password
    })
  })

  window.electron.ipcRenderer.once(RESPONSE_RP_SET_DEVICE_AUTHENTICATION_SETTINGS, (event, arg) => {
    if (!arg.success) {
      callback(false, 'Authentication settings save fail!')
    }
    window.electron.ipcRenderer.send(REQUEST_MP_SET_DEVICE_ALARM_SETTINGS, {
      MACAddress,
      portInfo: JSON.stringify(portInfo),
      powerInfo: JSON.stringify(powerInfo)
    })
  })

  window.electron.ipcRenderer.once(RESPONSE_RP_SET_DEVICE_ALARM_SETTINGS, (event, arg) => {
    if (!arg.success) {
      callback(false, 'Alarm settings save fail!')
    }
    callback(true, 'Advance settings save finish!')
  })

  window.electron.ipcRenderer.send(REQUEST_MP_SET_DEVICE_COMMUNITY_SETTINGS, {
    MACAddress,
    snmpVer: SNMPVersion,
    readCommunity,
    writeCommunity
  })
}

export const initDeviceAdvanced = (param) => (dispatch, getState) => {
  const { MACAddress } = param
  const { model } = getState().discovery.defaultDeviceData[MACAddress]
  dispatch(initDeviceAdvancedData({ MACAddress, model }))
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_ALARM_SETTINGS, (event, arg) => {
    if (arg.success) {
      dispatch(initAlarmData(JSON.parse(arg.data)))
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_ALARM_SETTINGS, { MACAddress })

  window.electron.ipcRenderer.once(RESPONSE_RP_GET_DEVICE_COMMUNITY_SETTINGS, (event, arg) => {
    if (arg.success) {
      dispatch(initSNMPCommunityData(arg.data))
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_DEVICE_COMMUNITY_SETTINGS, { MACAddress })

  window.electron.ipcRenderer.once(RESPONSE_RP_GET_DEVICE_AUTHENTICATION_SETTINGS, (event, arg) => {
    // console.log(arg)
    if (arg.success) {
      dispatch(initAuthenticationData(arg.data))
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_DEVICE_AUTHENTICATION_SETTINGS, { MACAddress })

  dispatch(openAdvanceDrawer(true), dispatch(openDialog('advanceSetting')))
}

const deviceAdvanceSettingSlice = createSlice({
  name: 'deviceAdvanceSettingSlice',
  initialState: {
    portInfo: {},
    powerInfo: {},
    model: '',
    MACAddress: '',
    SNMPVersion: '',
    readCommunity: '',
    writeCommunity: '',
    username: '',
    password: '',
    preSaveResult: '',
    drawVisible: false
  },
  reducers: {
    initDeviceAdvancedData: (state, { payload }) => {
      const { MACAddress, model } = payload
      return { ...state, MACAddress, model }
    },
    initSNMPCommunityData: (state, { payload }) => {
      const { snmpVer, readCommunity, writeCommunity } = payload
      return { ...state, SNMPVersion: snmpVer, readCommunity, writeCommunity }
    },
    initAuthenticationData: (state, { payload }) => {
      const { username, password } = payload
      return { ...state, username, password }
    },
    initAlarmData: (state, { payload }) => {
      const { portInfo, powerInfo } = payload
      return { ...state, portInfo, powerInfo }
    },
    switchPowerAlarm: (state, { payload }) => {
      const { power, value, type } = payload
      return {
        ...state,
        powerInfo: { ...state.powerInfo, [power]: { ...state.powerInfo[power], [type]: value } }
      }
    },
    switchPortLinkAlarm: (state, { payload }) => {
      const { port, value, type } = payload
      return {
        ...state,
        portInfo: { ...state.portInfo, [port]: { ...state.portInfo[port], [type]: value } }
      }
    },
    setDeviceAuthenticationData: (state, { payload }) => {
      const { value, type } = payload
      return value.length > 255 ? { ...state } : { ...state, [type]: value }
    },
    setDeviceSNMPCommunity: (state, { payload }) => {
      const { value, type } = payload
      return value.length > 255 ? { ...state } : { ...state, [type]: value }
    },
    setDeviceSNMPVersion: (state, { payload }) => {
      return { ...state, SNMPVersion: payload }
    },
    openAdvanceDrawer: (state, { payload }) => {
      // console.log(payload)
      return { ...state, drawVisible: payload }
    },
    pushSaveResultArray: (state, { payload }) => {
      return { ...state, preSaveResult: payload }
    },
    clearData: () => {
      return {
        model: '',
        MACAddress: '',
        SNMPVersion: '',
        readCommunity: '',
        writeCommunity: '',
        preSaveResult: '',
        username: '',
        password: '',
        drawVisible: false,
        portInfo: {},
        powerInfo: {}
      }
    }
  }
})

export const {
  initDeviceAdvancedData,
  initSNMPCommunityData,
  initAuthenticationData,
  initAlarmData,
  switchPortLinkAlarm,
  switchPowerAlarm,
  pushSaveResultArray,
  setDeviceAuthenticationData,
  setDeviceSNMPCommunity,
  setDeviceSNMPVersion,
  openAdvanceDrawer,
  clearData
} = deviceAdvanceSettingSlice.actions
const memoizedDeviceAdvanceSettingSelector = (state) => state.deviceAdvanceSetting
export const deviceAdvanceSettingSelector = createSelector(
  memoizedDeviceAdvanceSettingSelector,
  ({
    portInfo,
    powerInfo,
    model,
    MACAddress,
    SNMPVersion,
    readCommunity,
    writeCommunity,
    username,
    password,
    preSaveResult,
    drawVisible
  }) => ({
    portInfo,
    powerInfo,
    model,
    MACAddress,
    SNMPVersion,
    readCommunity,
    writeCommunity,
    username,
    password,
    preSaveResult,
    drawVisible
  })
)

export default deviceAdvanceSettingSlice
