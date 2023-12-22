/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { updateLoadingVisible } from './preferenceSlice'
import {
  RESPONSE_RP_GET_ALL_NETWORK_INTERFACES,
  REQUEST_MP_GET_ALL_NETWORK_INTERFACES,
  REQUEST_MP_SET_THE_NETWORK_INTERFACE,
  RESPONSE_RP_SET_THE_NETWORK_INTERFACE
} from '../../../../main/utils/IPCEvents'
import { createSelector } from 'reselect'

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
      dispatch(updateLoadingVisible())
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_ALL_NETWORK_INTERFACES)
  dispatch(updateLoadingVisible())
}

const generalSlice = createSlice({
  name: 'generalSlice',
  initialState: {
    isConfigChange: false,
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
      ///const { action } = payload
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
const memoizedGeneralSelector = (state) => state.general
export const generalSelector = createSelector(
  memoizedGeneralSelector,
  ({ NICData, validsData }) => ({ NICData, validsData })
)

export default generalSlice

const getStateOfFormatValid = (state, valid) => ({
  validsData: {
    ...state.validsData,
    ...valid
  }
})
const getStateOfSetValue = (state, payload) => ({
  isConfigChange: true,
  NICData: {
    ...state.NICData,
    ...payload
  }
})
const changeObjectState = (state, newValue) => ({
  ...state,
  ...newValue
})
