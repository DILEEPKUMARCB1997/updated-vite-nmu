/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_APP_INITIAL_DATA,
  RESPONSE_RP_GET_APP_INITIAL_DATA
} from '../../../main/utils/IPCEvents'
import { setSNMPAppInitialData } from './Preferences/snmpSlice'
import { showDiscoveryTableCheckBox, clearDiscoverTableSelect } from './discoverySlice'

export const requestAppInitialData = () => (dispatch) => {
  window.electron.ipcRenderer.on(RESPONSE_RP_GET_APP_INITIAL_DATA, (event, arg) => {
    const { appInitialData } = arg.data
    dispatch(setSNMPAppInitialData({ ...appInitialData.SNMP }))
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_APP_INITIAL_DATA)
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
    nextInitRenderStep: (state, { payload }) => {
      const { action } = payload
      return { ...state, initRenderStep: state.initRenderStep + 1 }
    },
    REMOVE_BATCH_OPERATE_EVENT: (state, { payload }) => {
      return { ...state, showBatchOperateTips: false, batchOperateEvent: '' }
    }
  }
})

export const { openDevicesMenu, nextInitRenderStep, REMOVE_BATCH_OPERATE_EVENT } =
  UIControlSlice.actions

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
