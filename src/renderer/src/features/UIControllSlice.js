/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_APP_INITIAL_DATA,
  RESPONSE_RP_GET_APP_INITIAL_DATA
} from '../../../main/utils/IPCEvents'
import { setSNMPAppInitialData } from './Preferences/snmpSlice'
import { showDiscoveryTableCheckBox, clearDiscoverTableSelect } from './discoverySlice'
import { setSNMPSelectOnly } from './discoverySlice'

const SNMPOnlyEvents = ['resetToDefault', 'backupRestore', 'syslogSetting', 'trapSetting']
export const requestAppInitialData = () => (dispatch) => {
  window.electron.ipcRenderer.on(RESPONSE_RP_GET_APP_INITIAL_DATA, (event, arg) => {
    const { appInitialData } = arg.data
    dispatch(setSNMPAppInitialData({ ...appInitialData.SNMP }))
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_APP_INITIAL_DATA)
}
export const setBatchOperateEvent = (payload) => (dispatch) => {
  dispatch(SET_BATCH_OPERATE_EVENT(payload))
  dispatch(showDiscoveryTableCheckBox(true))
  if (SNMPOnlyEvents.includes(payload.event)) {
    dispatch(setSNMPSelectOnly(true))
  } else {
    dispatch(setSNMPSelectOnly(false))
  }
}

export const removeBatchOperateEvent = () => (dispatch) => {
  dispatch(REMOVE_BATCH_OPERATE_EVENT())
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
    REMOVE_BATCH_OPERATE_EVENT: (state, { payload }) => {
      return { ...state, showBatchOperateTips: false, batchOperateEvent: '' }
    },
    SET_BATCH_OPERATE_EVENT: (state, action) => {
      const { event } = action.payload
      return { ...state, showBatchOperateTips: true, batchOperateEvent: event }
    }
  }
})

export const {
  openDevicesMenu,
  nextInitRenderStep,
  showCheckSNMPModal,
  REMOVE_BATCH_OPERATE_EVENT,
  SET_BATCH_OPERATE_EVENT
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
