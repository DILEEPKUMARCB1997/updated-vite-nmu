/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import { openDialog } from './dialogSlice'
import {
  REQUEST_MP_DISCOVERY_ALL_DEVICES,
  RESPONSE_RP_DISCOVERY_ALL_DEVICES
} from '../../../main/utils/IPCEvents'

export const requestDiscovery = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_DISCOVERY_ALL_DEVICES, (event, arg) => {
    console.log(arg)
    if (arg.isEnableSNMP) {
      dispatch(openDialog('snmpScanProgress'))
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_DISCOVERY_ALL_DEVICES)
}

export const requestDiscoveryAfterLogin = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_DISCOVERY_ALL_DEVICES, (event, arg) => {
    // console.log(arg);
    if (arg.isEnableSNMP) {
      // dispatch(openDialog('snmpScanProgress'));
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_DISCOVERY_ALL_DEVICES)
}

const discoverySlice = createSlice({
  name: 'discoverySlice',
  initialState: {
    defaultDeviceData: {},
    defaultDeviceArrayData: [],
    groupDeviceData: {},
    groupDeviceArrayData: {},
    conflictIP: [],
    selected: [],
    SNMPSelectOnly: false,
    showCheckBox: false,
    groupView: 'group'
  },
  reducers: {
    updateDiscoveryData: (state, { payload }) => {
      let defaultDeviceData = {}
      let groupDeviceArrayData = {}
      const compareIP = new Map()
      let conflictIP = []
      Object.entries(payload).forEach(([groupKey, groupValue]) => {
        Object.values(groupValue.deviceList).forEach((device) => {
          const compareMAC = compareIP.get(device.IPAddress)
          if (compareMAC === undefined) {
            compareIP.set(device.IPAddress, device.MACAddress)
          } else if (compareMAC !== device.MACAddress) {
            conflictIP = [...conflictIP, device.IPAddress]
          }
          defaultDeviceData = {
            ...defaultDeviceData,
            [device.MACAddress]: {
              ...device
            }
          }
        })
        groupDeviceArrayData = {
          ...groupDeviceArrayData,
          [groupKey]: Object.values(groupValue.deviceList)
        }
      })
      return {
        ...state,
        groupDeviceData: payload,
        groupDeviceArrayData,
        defaultDeviceData,
        defaultDeviceArrayData: Object.values(defaultDeviceData),
        conflictIP
      }
    },
    switchGroupView: (state, { payload }) => {
      state.groupView = payload
    },
    showDiscoveryTableCheckBox: (state, action) => {
      return {
        ...state,
        showCheckBox: action.payload
      }
    },
    clearDiscoverTableSelect: (state) => {
      return {
        ...state,
        selected: []
      }
    }
  }
})

export const {
  updateDiscoveryData,
  switchGroupView,
  showDiscoveryTableCheckBox,
  clearDiscoverTableSelect
} = discoverySlice.actions

export const discoverySelector = (state) => {
  const {
    defaultDeviceData,
    defaultDeviceArrayData,
    groupDeviceData,
    groupDeviceArrayData,
    conflictIP,
    selected,
    SNMPSelectOnly,
    showCheckBox,
    groupView
  } = state.discovery

  return {
    defaultDeviceData,
    defaultDeviceArrayData,
    groupDeviceData,
    groupDeviceArrayData,
    conflictIP,
    selected,
    SNMPSelectOnly,
    showCheckBox,
    groupView
  }
}

export default discoverySlice
