/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_APP_INITIAL_DATA,
  RESPONSE_RP_GET_APP_INITIAL_DATA
} from '../../../main/utils/IPCEvents'
import { setSNMPAppInitialData } from './Preferences/snmpSlice'
import {
  setSNMPSelectOnly,
  showDiscoveryTableCheckBox,
  clearDiscoverTableSelect
} from './discoverySlice'
import { closeSnack } from './snackSlice'

const SNMPOnlyEvents = ['resetToDefault', 'backupRestore', 'syslogSetting', 'trapSetting']
export const requestAppInitialData = () => (dispatch) => {
  window.electron.ipcRenderer.on(RESPONSE_RP_GET_APP_INITIAL_DATA, (event, arg) => {
    const { appInitialData } = arg.data
    dispatch(setSNMPAppInitialData({ ...appInitialData.SNMP }))
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_APP_INITIAL_DATA)
}
export const setBatchOperateEvent = (payload) => (dispatch) => {
  dispatch(setBatchOperateEvents(payload))
  dispatch(showDiscoveryTableCheckBox(true))
  if (SNMPOnlyEvents.includes(payload.event)) {
    dispatch(setSNMPSelectOnly(true))
  } else {
    dispatch(setSNMPSelectOnly(false))
  }
}

export const removeBatchOperateEvent = () => (dispatch) => {
  dispatch(removeBatchOperate())
  dispatch(showDiscoveryTableCheckBox(false))
  dispatch(clearDiscoverTableSelect())
}

const UIControlSlice = createSlice({
  name: 'UIControlSlice',
  initialState: {
    initRenderStep: 0,
    manualOpenDeviceMenu: false,
    version: 'J1.8',
    showCheckSNMPModal: false,
    batchOperateEvent: '',
    showBatchOperateTips: false
  },
  reducers: {
    openDevicesMenu: (state, { payload }) => {
      return { ...state, manualOpenDeviceMenu: payload }
    },
    nextInitRenderStep: (state) => {
      return { ...state, initRenderStep: state.initRenderStep + 1 }
    },
    showCheckSNMPModal: (state, { payload }) => {
      return { ...state, showCheckSNMPModal: payload }
    },
    removeBatchOperate: (state, { payload }) => {
      return { ...state, showBatchOperateTips: false, batchOperateEvent: '' }
    },
    setBatchOperateEvents: (state, action) => {
      const { event } = action.payload
      return { ...state, showBatchOperateTips: true, batchOperateEvent: event }
    }
  }
})

export const {
  openDevicesMenu,
  nextInitRenderStep,
  showCheckSNMPModal,
  removeBatchOperate,
  setBatchOperateEvents
} = UIControlSlice.actions

export const UIControlSelector = (state) => {
  const {
    initRenderStep,
    manualOpenDeviceMenu,
    version,
    showCheckSNMPModal,
    batchOperateEvent,
    showBatchOperateTips
  } = state.UIControl
  return {
    initRenderStep,
    manualOpenDeviceMenu,
    version,
    showCheckSNMPModal,
    batchOperateEvent,
    showBatchOperateTips
  }
}

export default UIControlSlice
