/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

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
    removeBatchOperateEvent: (state, { payload }) => {
      const { action } = payload
      return { ...state, showBatchOperateTips: false, batchOperateEvent: '' }
    }
  }
})

export const { openDevicesMenu, nextInitRenderStep, removeBatchOperateEvent } =
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
