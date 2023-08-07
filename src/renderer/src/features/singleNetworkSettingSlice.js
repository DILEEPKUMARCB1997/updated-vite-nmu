import { createSlice } from '@reduxjs/toolkit'
import {
  RESPONSE_RP_SET_SNMP_DEVICE_NETWORK_SETTINGS,
  RESPONSE_RP_SET_GWD_DEVICE_NETWORK_SETTINGS,
  REQUEST_MP_SET_SNMP_DEVICE_NETWORK_SETTINGS,
  REQUEST_MP_SET_GWD_DEVICE_NETWORK_SETTINGS
} from '../../../main/utils/IPCEvents'
const IPFormat =
  /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){1}$/
export const clearSingleNetworkSettingData = () => (dispatch) => {
  dispatch(openDrawer(false))
  setTimeout(() => {
    dispatch(clearData())
  }, 200)
}
export const requestSetNetworkSetting = (callback) => (dispatch, getState) => {
  const {
    isSNMPmode,
    isDHCP,
    MACAddress,
    IPAddress,
    netmask,
    gateway,
    dns1,
    dns2,
    oldIPAddress,
    hostname
  } = getState().singleNetworkSetting
  const responseChannel = isSNMPmode
    ? RESPONSE_RP_SET_SNMP_DEVICE_NETWORK_SETTINGS
    : RESPONSE_RP_SET_GWD_DEVICE_NETWORK_SETTINGS
  const requestChannel = isSNMPmode
    ? REQUEST_MP_SET_SNMP_DEVICE_NETWORK_SETTINGS
    : REQUEST_MP_SET_GWD_DEVICE_NETWORK_SETTINGS
  let data = { MACAddress, hostname }
  if (isSNMPmode) {
    const snmpData = isDHCP ? { isDHCP } : { isDHCP, IPAddress, netmask, gateway, dns1, dns2 }
    data = { ...data, ...snmpData }
  } else {
    data = {
      ...data,
      oldIPAddress,
      newIPAddress: IPAddress,
      netmask,
      gateway
    }
  }

  window.electron.ipcRenderer.once(`${responseChannel} ${MACAddress}`, (event, arg) => {
    if (arg.success) {
      callback(true, 'Set network settngs success!')
    } else {
      callback(true, 'Set network settngs fail!')
    }
  })
  window.electron.ipcRenderer.send(requestChannel, data)
}

const singleNetworkSettingSlice = createSlice({
  name: 'singleNetworkSettingSlice',
  initialState: {
    drawerVisible: false,
    loading: true,
    model: '',
    isSNMPmode: false,
    isDHCP: false,
    MACAddress: '',
    IPAddress: '',
    netmask: '',
    gateway: '',
    hostname: '',
    oldIPAddress: '',
    dns1: '',
    dns2: '',
    validIPAddress: false,
    validNetmask: false,
    validGateway: false,
    validDNS1: false,
    validDNS2: false
  },
  reducers: {
    openDrawer: (state, action) => {
      return { ...state, drawerVisible: action.payload }
    },
    clearData: () => {
      return {
        drawerVisible: false,
        loading: false,
        model: '',
        isSNMPmode: false,
        isDHCP: false,
        MACAddress: '',
        IPAddress: '',
        netmask: '',
        gateway: '',
        hostname: '',
        oldIPAddress: '',
        dns1: '',
        dns2: '',
        validIPAddress: false,
        validNetmask: false,
        validGateway: false,
        validDNS1: false,
        validDNS2: false
      }
    },
    setDHCP: (state, action) => {
      const { isDHCP } = action.payload
      if (isDHCP) {
        return {
          ...state,
          isDHCP,
          IPAddress: '0.0.0.0',
          netmask: '0.0.0.0',
          gateway: '0.0.0.0',
          dns1: '0.0.0.0',
          dns2: '0.0.0.0',
          validIPAddress: true,
          validNetmask: true,
          validGateway: true,
          validDNS1: true,
          validDNS2: true
        }
      }
      return {
        ...state,
        isDHCP,
        IPAddress: '',
        netmask: '',
        gateway: '',
        dns1: '',
        dns2: '',
        validIPAddress: false,
        validNetmask: false,
        validGateway: false,
        validDNS1: false,
        validDNS2: false
      }
    },
    setNetworkAddressData: (state, action) => {
      const { type, valid, text } = action.payload
      return {
        ...state,
        [type]: text,
        [valid]: IPFormat.test(text)
      }
    },
    setHostname: (state, action) => {
      const { hostname } = action.payload
      return { ...state, hostname }
    }
  }
})

export const { openDrawer, clearData, setDHCP, setNetworkAddressData, setHostname } =
  singleNetworkSettingSlice.actions

export const singleNetworkSettingSelector = (state) => {
  const {
    drawerVisible,
    loading,
    model,
    isSNMPmode,
    isDHCP,
    MACAddress,
    IPAddress,
    netmask,
    gateway,
    hostname,
    oldIPAddress,
    dns1,
    dns2,
    validIPAddress,
    validNetmask,
    validGateway,
    validDNS1,
    validDNS2
  } = state.singleNetworkSetting
  return {
    drawerVisible,
    loading,
    model,
    isSNMPmode,
    isDHCP,
    MACAddress,
    IPAddress,
    netmask,
    gateway,
    hostname,
    oldIPAddress,
    dns1,
    dns2,
    validIPAddress,
    validNetmask,
    validGateway,
    validDNS1,
    validDNS2
  }
}

export default singleNetworkSettingSlice
