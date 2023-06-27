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
    }
  }
})

export const { openDevicesMenu } = UIControlSlice.actions

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
