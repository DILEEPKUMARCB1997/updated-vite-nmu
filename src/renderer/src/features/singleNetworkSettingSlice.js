import { createSlice } from '@reduxjs/toolkit'
const IPFormat =
  /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){1}$/
export const clearSingleNetworkSettingData = () => (dispatch) => {
  dispatch(openDrawer(false))
  setTimeout(() => {
    dispatch(clearData())
  }, 200)
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
