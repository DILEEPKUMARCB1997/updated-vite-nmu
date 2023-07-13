/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_APP_INITIAL_DATA,
  RESPONSE_RP_GET_APP_INITIAL_DATA
} from '../../../main/utils/IPCEvents'
import { setSNMPAppInitialData } from './Preferences/snmpSlice'

export const requestAppInitialData = () => (dispatch) => {
  window.electron.ipcRenderer.on(RESPONSE_RP_GET_APP_INITIAL_DATA, (event, arg) => {
    const { appInitialData } = arg.data
    dispatch(setSNMPAppInitialData({ ...appInitialData.SNMP }))
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_APP_INITIAL_DATA)
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
    }
  }
})

export const { openDevicesMenu, nextInitRenderStep } = UIControlSlice.actions

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
