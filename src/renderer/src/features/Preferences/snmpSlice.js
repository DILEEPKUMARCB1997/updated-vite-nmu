import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_IP_RANGE_SETTINGS,
  REQUEST_MP_GET_SNMP_SETTINGS,
  REQUEST_MP_SET_IP_RANGE_SETTINGS,
  REQUEST_MP_SET_SNMP_SETTINGS,
  RESPONSE_RP_GET_IP_RANGE_SETTINGS,
  RESPONSE_RP_GET_SNMP_SETTINGS,
  RESPONSE_RP_SET_IP_RANGE_SETTINGS,
  RESPONSE_RP_SET_SNMP_SETTINGS
} from '../../../../main/utils/IPCEvents'
import { updateLoadingVisible } from './preferenceSlice'

const valueFormat = {
  common: {
    words2: /^\d{0,2}$/,
    words4: /^\d{0,4}$/
  },
  SNMPScan: {
    POLLING_INTERVAL_MAX: 30,
    POLLING_INTERVAL_MIN: 0,
    ICMP_TIMEOUT_MAX: 9999,
    ICMP_TIMEOUT_MIN: 2000,
    SNMP_TIMEOUT_MAX: 9999,
    SNMP_TIMEOUT_MIN: 3000
  },
  community: {
    MAX_LENGTH: 10
  }
}

export const requestGetIPRange = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_IP_RANGE_SETTINGS, (event, arg) => {
    //console.log(arg);
    if (arg.success) {
      dispatch(initIPRangeData(arg.data))
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_IP_RANGE_SETTINGS)
}

export const requestGetSNMPData = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_SNMP_SETTINGS, (event, arg) => {
    //console.log(arg);
    if (arg.success) {
      dispatch(initSnmpData(arg.data))
      dispatch(updateLoadingVisible())
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_SNMP_SETTINGS)
  dispatch(updateLoadingVisible())
}

export const requestSetSNMPData = (callback) => (dispatch, getState) => {
  const {
    ICMPTimeout,
    SNMPPollInterval,
    SNMPTimeout,
    isEnable,
    isIpFixed,
    readCommunity,
    writeCommunity,
    version,
    isPrecheck
  } = getState().snmp.SNMPData
  // console.log('snmp data', getState().snmp.SNMPData)
  const resultArray = []
  window.electron.ipcRenderer.once(RESPONSE_RP_SET_IP_RANGE_SETTINGS, (event, arg) => {
    //console.log(arg);
    resultArray.push(arg.success)
    if (resultArray.length === 2) {
      if (resultArray.every((element) => element)) {
        callback(arg)
      }
    }
  })
  window.electron.ipcRenderer.once(RESPONSE_RP_SET_SNMP_SETTINGS, (event, arg) => {
    //console.log(arg);
    resultArray.push(arg.success)
    if (resultArray.length === 2) {
      if (resultArray.every((element) => element)) {
        callback(arg)
      }
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SET_IP_RANGE_SETTINGS, {
    ipRangeList: Object.values(getState().snmp.IPRangeData)
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SET_SNMP_SETTINGS, {
    ICMPTimeout,
    SNMPPollInterval,
    SNMPTimeout,
    isEnable,
    isIpFixed,
    readCommunity,
    writeCommunity,
    version,
    isPrecheck
  })
}

const snmpSlice = createSlice({
  name: 'snmpSlice',
  initialState: {
    SNMPData: {},
    isConfigChange: false,
    IPRangeData: {},
    isPrecheck: false,
    validsData: {
      isSNMPPollIntervalValid: true,
      isICMPTimeoutValid: true,
      isSNMPTimeoutValid: true,
      isReadCommunityValid: true,
      isWriteCommunityValid: true
    }
  },
  reducers: {
    initIPRangeData: (state, { payload }) => {
      let IPRangeData = {}
      payload.forEach((value, key) => {
        IPRangeData = {
          ...IPRangeData,
          [key]: value
        }
      })
      return { ...state, IPRangeData }
    },
    initSnmpData: (state, { payload }) => {
      return { ...state, SNMPData: payload }
    },
    setEnableSNMP: (state, { payload }) => {
      const isEnable = payload
      return {
        ...state,
        ...getStateOfSetValue(state, { isEnable })
      }
    },
    setSNMPPollInterval: (state, { payload }) => {
      if (!valueFormat.common.words2.test(payload)) {
        return { ...state }
      }
      const SNMPPollInterval = Number(payload)
      const isSNMPPollIntervalValid =
        SNMPPollInterval <= valueFormat.SNMPScan.POLLING_INTERVAL_MAX &&
        SNMPPollInterval >= valueFormat.SNMPScan.POLLING_INTERVAL_MIN
      return {
        ...state,
        ...getStateOfSetValue(state, { SNMPPollInterval }),
        ...getStateOfFormatValid(state, { isSNMPPollIntervalValid })
      }
    },
    setICMPTimeout: (state, { payload }) => {
      //console.log(payload)
      if (!valueFormat.common.words4.test(payload)) {
        return { ...state }
      }
      const ICMPTimeout = Number(payload)
      const isICMPTimeoutValid =
        ICMPTimeout <= valueFormat.SNMPScan.ICMP_TIMEOUT_MAX &&
        ICMPTimeout >= valueFormat.SNMPScan.ICMP_TIMEOUT_MIN
      return {
        ...state,
        ...getStateOfSetValue(state, { ICMPTimeout }),
        ...getStateOfFormatValid(state, { isICMPTimeoutValid })
      }
    },
    setSNMPTimeout: (state, { payload }) => {
      if (!valueFormat.common.words4.test(payload)) {
        return { ...state }
      }
      const SNMPTimeout = Number(payload)
      const isSNMPTimeoutValid =
        SNMPTimeout <= valueFormat.SNMPScan.SNMP_TIMEOUT_MAX &&
        SNMPTimeout >= valueFormat.SNMPScan.SNMP_TIMEOUT_MIN
      return {
        ...state,
        ...getStateOfSetValue(state, { SNMPTimeout }),
        ...getStateOfFormatValid(state, { isSNMPTimeoutValid })
      }
    },
    setSNMPVersion: (state, { payload }) => {
      //console.log(payload)
      const version = payload
      return {
        ...state,
        ...getStateOfSetValue(state, { version })
      }
    },
    setReadCommunity: (state, { payload }) => {
      const readCommunity = payload
      const isReadCommunityValid = readCommunity.length < valueFormat.community.MAX_LENGTH //true;
      return {
        ...state,
        ...getStateOfSetValue(state, { readCommunity }),
        ...getStateOfFormatValid(state, { isReadCommunityValid })
      }
    },
    setWriteCommunity: (state, { payload }) => {
      const writeCommunity = payload
      const isWriteCommunityValid = writeCommunity.length < valueFormat.community.MAX_LENGTH //true;
      return {
        ...state,
        ...getStateOfSetValue(state, { writeCommunity }),
        ...getStateOfFormatValid(state, { isWriteCommunityValid })
      }
    },
    addNewIPRangeData: (state, { payload }) => {
      const { startIP, endIP } = payload
      const keys = Object.keys(state.IPRangeData)
      let newIndex = 0
      const lastIndex = keys.length - 1
      if (keys.length !== 0) {
        newIndex = Number(keys[lastIndex]) + 1
      }
      return {
        ...state,
        ...getStateOfSetIPRange(state, {
          [newIndex]: {
            startIP,
            endIP,
            isActive: true
          }
        })
      }
    },
    updateIPRangeActive: (state, { payload }) => {
      const { id, isActive } = payload
      return {
        ...state,
        ...getStateOfSetIPRange(state, {
          [id]: {
            ...state.IPRangeData[id],
            isActive
          }
        })
      }
    },
    removeIPRangeData: (state, { payload }) => {
      //   console.log(payload)
      const { [payload]: _, ...IPRangeData } = state.IPRangeData
      console.log(JSON.stringify(state.IPRangeData))
      console.log('iprangedata', payload, IPRangeData)
      return {
        ...state,
        IPRangeData,
        isConfigChange: true
      }
    },
    setPrecheckSNMP: (state, { payload }) => {
      const isPrecheck = payload
      return {
        ...state,
        ...getStateOfSetValue(state, { isPrecheck }),
        isPrecheck
      }
    },
    setSNMPAppInitialData: (state, { payload }) => {
      const { isPrecheck } = payload
      return { ...state, isPrecheck: isPrecheck || false }
    },

    clearSNMPSettingData: (state) => {
      return {
        ...state,
        SNMPData: {},
        isConfigChange: false,
        IPRangeData: {},
        validsData: {
          isSNMPPollIntervalValid: true,
          isICMPTimeoutValid: true,
          isSNMPTimeoutValid: true,
          isReadCommunityValid: true,
          isWriteCommunityValid: true
        }
      }
    }
  }
})

export const {
  initIPRangeData,
  initSnmpData,
  setEnableSNMP,
  setSNMPPollInterval,
  setICMPTimeout,
  setSNMPTimeout,
  addNewIPRangeData,
  updateIPRangeActive,
  removeIPRangeData,
  setSNMPVersion,
  setReadCommunity,
  setWriteCommunity,
  setPrecheckSNMP,
  setSNMPAppInitialData,
  clearSNMPSettingData
} = snmpSlice.actions

export const snmpSelector = (state) => {
  const { SNMPData, isPrecheck, isConfigChange, IPRangeData, validsData } = state.snmp
  return { SNMPData, isPrecheck, isConfigChange, IPRangeData, validsData }
}

export default snmpSlice

const getStateOfSetValue = (state, payload) => ({
  isConfigChange: true,
  SNMPData: {
    ...state.SNMPData,
    ...payload
  }
})

const getStateOfFormatValid = (state, valid) => ({
  validsData: {
    ...state.validsData,
    ...valid
  }
})

const getStateOfSetIPRange = (state, payload) => ({
  isConfigChange: true,
  IPRangeData: {
    ...state.IPRangeData,
    ...payload
  }
})
