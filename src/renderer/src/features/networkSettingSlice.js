/* eslint-disable no-unused-vars */
import ip from 'ip'
import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_SET_GWD_DEVICE_NETWORK_SETTINGS,
  REQUEST_MP_SET_SNMP_DEVICE_NETWORK_SETTINGS,
  RESPONSE_RP_SET_GWD_DEVICE_NETWORK_SETTINGS,
  RESPONSE_RP_SET_SNMP_DEVICE_NETWORK_SETTINGS
} from '../../../main/utils/IPCEvents'
import { openDialog } from './dialogSlice'

const IPFormat =
  /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){1}$/

export const initNetworkSettingData = () => (dispatch, getState) => {
  const { selected, defaultDeviceData } = getState().discovery
  let deviceList = {}
  const deviceNum = selected.length
  selected.forEach((MACAddress) => {
    const { model, deviceType, IPAddress } = defaultDeviceData[MACAddress]
    deviceList = {
      ...deviceList,
      [MACAddress]: { model, deviceType, oldIPAddress: IPAddress, IPAddress: '', isValidIP: false }
    }
  })
  dispatch(initializeNetworkSettingData({ deviceList, deviceNum }))
  dispatch(openDialog('networkSetting'))
}

export const calculateIPAddress = () => (dispatch, getState) => {
  let existIP = [ip.toLong(ip.address())]
  let newIP = []

  getState().discovery.defaultDeviceArrayData.forEach((device) => {
    existIP = [...existIP, ip.toLong(device.IPAddress)]
  })

  console.log(existIP)
  existIP.sort((a, b) => a - b)
  let tempIP = ip.toLong(getState().networkSetting.startAddress)
  const count = getState().networkSetting.deviceNum
  for (let i = 0; i < count; i += 1) {
    let index = existIP.indexOf(tempIP)
    if (index !== -1) {
      while (tempIP === existIP[index]) {
        tempIP += 1
        index += 1
        if (tempIP > 4294967294) {
          tempIP = index = 1
        }
      }
    }
    newIP = [...newIP, tempIP]
    tempIP += 1
    if (tempIP > 4294967294) {
      tempIP = 1
    }
  }

  let newDeviceList = {}
  Object.entries(getState().networkSetting.deviceList).forEach(([key, value], index) => {
    newDeviceList = {
      ...newDeviceList,
      [key]: {
        ...value,
        IPAddress: ip.fromLong(newIP[index]),
        isValidIP: true
      }
    }
    existIP = [...existIP, newIP[index]]
  })

  dispatch(setCalculateResultData({ newDeviceList, count, existIP }))
}

export const setSingleDeviceAddress = (payload) => (dispatch, getState) => {
  let existIP = [...getState().networkSetting.existIP]
  let { validNum } = getState().networkSetting
  const { MACAddress, newIPAddress } = payload
  const { isValidIP, IPAddress } = getState().networkSetting.deviceList[MACAddress]
  existIP.splice(existIP.indexOf(ip.toLong(IPAddress)), 1)
  console.log(getState().networkSetting)
  const newIsValidIP = IPFormat.test(newIPAddress) && !existIP.includes(ip.toLong(newIPAddress))
  if (newIsValidIP ^ isValidIP) {
    if (newIsValidIP) {
      validNum += 1
      existIP = [...existIP, ip.toLong(newIPAddress)]
    } else {
      validNum -= 1
    }
  }
  dispatch(
    setSingleDeviceIPAddress({
      MACAddress,
      newIPAddress,
      validNum,
      newIsValidIP,
      existIP
    })
  )
}

const networkSettingResultListener = (dispatch) => (event, arg) => {
  console.log(arg)
  dispatch(setDeviceSettingStatus({ MACAddress: arg.data.MACAddress, status: arg.success }))
}

export const requestNetworkSetting = () => (dispatch, getState) => {
  dispatch(changeNetworkSettingStatus(1))
  const { isDHCP, deviceList, netmask, gateway, hostname, dns1, dns2 } = getState().networkSetting
  Object.entries(deviceList).forEach(([MACAddress, data]) => {
    if (data.deviceType === 'snmp' || data.deviceType === 'all') {
      window.electron.ipcRenderer.once(
        `${RESPONSE_RP_SET_SNMP_DEVICE_NETWORK_SETTINGS} ${MACAddress}`,
        networkSettingResultListener(dispatch)
      )
      window.electron.ipcRenderer.send(
        REQUEST_MP_SET_SNMP_DEVICE_NETWORK_SETTINGS,
        isDHCP
          ? {
              MACAddress,
              isDHCP,
              hostname
            }
          : {
              MACAddress,
              isDHCP,
              IPAddress: data.IPAddress,
              netmask,
              gateway,
              dns1,
              dns2,
              hostname
            }
      )
    } else if (data.deviceType === 'gwd') {
      window.electron.ipcRenderer.once(
        `${RESPONSE_RP_SET_GWD_DEVICE_NETWORK_SETTINGS} ${MACAddress}`,
        networkSettingResultListener(dispatch)
      )
      window.electron.ipcRenderer.send(REQUEST_MP_SET_GWD_DEVICE_NETWORK_SETTINGS, {
        MACAddress,
        oldIPAddress: data.oldIPAddress,
        newIPAddress: data.IPAddress,
        netmask,
        gateway,
        hostname
      })
    }
  })
}

const statusList = ['wait', 'start', 'finish']

const networkSettingSlice = createSlice({
  name: 'networkSettingSlice',
  initialState: {
    status: statusList[0],
    isDHCP: false,
    existIP: [],
    deviceList: {},
    netmask: '',
    gateway: '',
    dns1: '0.0.0.0',
    dns2: '0.0.0.0',
    hostname: '',
    validNetmask: false,
    validGateway: false,
    validDNS1: true,
    validDNS2: true,
    startAddress: '',
    validStartAddress: false,
    deviceNum: 0,
    validNum: 0,
    completeNum: 0,
    failNum: 0
  },
  reducers: {
    initializeNetworkSettingData: (state, { payload }) => {
      return {
        ...state,
        deviceList: payload.deviceList,
        deviceNum: payload.deviceNum
      }
    },
    setDeviceSettingStatus: (state, { payload }) => {
      const { MACAddress, status } = payload
      return {
        ...state,
        deviceList: {
          ...state.deviceList,
          [MACAddress]: {
            ...state.deviceList[MACAddress],
            status
          }
        },
        completeNum: state.completeNum + 1,
        failNum: status ? state.failNum : state.failNum + 1,
        status: statusList[state.completeNum + 1 === state.deviceNum ? 2 : 1]
      }
    },
    setCalculateResultData: (state, { payload }) => {
      console.log('calculate', payload)
      return {
        ...state,
        deviceList: payload.newDeviceList,
        validNum: payload.count,
        existIP: payload.existIP
      }
    },
    setSingleDeviceIPAddress: (state, { payload }) => {
      const { MACAddress, newIPAddress, newIsValidIP, validNum, existIP } = payload
      return {
        ...state,
        deviceList: {
          ...state.deviceList,
          [MACAddress]: {
            ...state.deviceList[MACAddress],
            IPAddress: newIPAddress,
            isValidIP: newIsValidIP
          }
        },
        validNum,
        existIP
      }
    },
    setNetworkSettingAddress: (state, { payload }) => {
      console.log('payload netmask', payload)
      const { type, validType, value } = payload
      return { ...state, [type]: value, [validType]: IPFormat.test(value) }
    },
    setNetworkSettingDHCP: (state, { payload }) => {
      const isDHCP = payload
      let newDeviceList = {}
      Object.entries(state.deviceList).forEach(([MACAddress, Data]) => {
        newDeviceList = {
          ...newDeviceList,
          [MACAddress]: { ...Data, IPAddress: isDHCP ? '0.0.0.0' : '', isValidIP: isDHCP }
        }
      })
      if (isDHCP) {
        return {
          ...state,
          isDHCP,
          netmask: '0.0.0.0',
          gateway: '0.0.0.0',
          dns1: '0.0.0.0',
          dns2: '0.0.0.0',
          startAddress: '0.0.0.0',
          validNetmask: true,
          validGateway: true,
          validStartAddress: true,
          validDNS1: true,
          validDNS2: true,
          validNum: state.deviceNum,
          deviceList: newDeviceList
        }
      }
      return {
        ...state,
        isDHCP,
        netmask: '',
        gateway: '',
        dns1: '0.0.0.0',
        dns2: '0.0.0.0',
        startAddress: '',
        validNetmask: false,
        validGateway: false,
        validStartAddress: false,
        validDNS1: true,
        validDNS2: true,
        validNum: 0,
        deviceList: newDeviceList
      }
    },
    setNetworkSettingHostname: (state, { payload }) => {
      return { ...state, hostname: payload }
    },
    setStartAddress: (state, { payload }) => {
      return { ...state, startAddress: payload, validStartAddress: IPFormat.test(payload) }
    },
    changeNetworkSettingStatus: (state, { payload }) => {
      console.log(payload)
      return {
        ...state,
        status: statusList[payload]
      }
    },
    clearNetworkSetting: (state, { payload }) => {
      return {
        status: statusList[0],
        isDHCP: false,
        existIP: [],
        deviceList: {},
        netmask: '',
        gateway: '',
        dns1: '0.0.0.0',
        dns2: '0.0.0.0',
        hostname: '',
        validNetmask: false,
        validGateway: false,
        validDNS1: true,
        validDNS2: true,
        startAddress: '',
        validStartAddress: false,
        deviceNum: 0,
        validNum: 0,
        completeNum: 0,
        failNum: 0
      }
    }
  }
})

export const {
  initializeNetworkSettingData,
  setSingleDeviceIPAddress,
  setDeviceSettingStatus,
  setCalculateResultData,
  setNetworkSettingAddress,
  setNetworkSettingDHCP,
  setNetworkSettingHostname,
  setStartAddress,
  changeNetworkSettingStatus,
  clearNetworkSetting
} = networkSettingSlice.actions

export const networkSettingSelector = (state) => {
  const {
    status,
    isDHCP,
    existIP,
    deviceList,
    netmask,
    gateway,
    dns1,
    dns2,
    hostname,
    validNetmask,
    validGateway,
    validDNS1,
    validDNS2,
    startAddress,
    validStartAddress,
    deviceNum,
    validNum,
    completeNum,
    failNum
  } = state.networkSetting
  return {
    status,
    isDHCP,
    existIP,
    deviceList,
    netmask,
    gateway,
    dns1,
    dns2,
    hostname,
    validNetmask,
    validGateway,
    validDNS1,
    validDNS2,
    startAddress,
    validStartAddress,
    deviceNum,
    validNum,
    completeNum,
    failNum
  }
}

export default networkSettingSlice
