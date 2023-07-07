/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import {
  RESPONSE_RP_GET_ALL_NETWORK_INTERFACES,
  REQUEST_MP_GET_ALL_NETWORK_INTERFACES,
  REQUEST_MP_SET_THE_NETWORK_INTERFACE,
  RESPONSE_RP_SET_THE_NETWORK_INTERFACE
} from '../../../../main/utils/IPCEvents'

export const requireSetNICData = (callback) => (dispatch, getState) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_SET_THE_NETWORK_INTERFACE, (event, arg) => {
    //console.log(arg);
    callback(arg.success)
  })
  const { activeIndex } = getState().general.NICData
  window.electron.ipcRenderer.send(REQUEST_MP_SET_THE_NETWORK_INTERFACE, {
    name: getState().general.NICData.niList[activeIndex].name,
    IPAddress: getState().general.NICData.niList[activeIndex].IPAddress
  })
}

export const requestGetNICData = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_ALL_NETWORK_INTERFACES, (event, arg) => {
    //console.log(arg);
    if (arg.success) {
      dispatch(initNICData(arg.data))
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_ALL_NETWORK_INTERFACES)
}

export const generalSlice = createSlice({
  name: 'generalSlice',
  initialState: {
    NICData: {},
    validsData: {
      isNICValid: true
    }
  },
  reducers: {
    setNICActiveIndex: (state, action) => {
      //  const { action } = payload
      const activeIndex = Number(action.payload)
      const isNICValid = true
      return {
        ...state,
        ...getStateOfSetValue(state, { activeIndex }),
        ...getStateOfFormatValid(state, { isNICValid })
      }
    },
    clearGeneralData: (state, { payload }) => {
      //  const { action } = payload
      return {
        ...state,
        isConfigChange: false,
        NICData: {},
        validsData: {
          isNICValid: true
        }
      }
    },
    initNICData: (state, action) => {
      return changeObjectState(state, { NICData: action.payload })
    }
  }
})

export const { clearGeneralData, setNICActiveIndex, initNICData } = generalSlice.actions

export const generalSelector = (state) => {
  const { NICData, validsData } = state.general
  return { NICData, validsData }
}

const getStateOfSetValue = (state, payload) => ({
  isConfigChange: true,
  NICData: {
    ...state.NICData,
    ...payload
  }
})

const getStateOfFormatValid = (state, valid) => ({
  validsData: {
    ...state.validsData,
    ...valid
  }
})
const changeObjectState = (state, newValue) => ({
  ...state,
  ...newValue
})
