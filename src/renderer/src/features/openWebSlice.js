import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_DEVICE_AUTHENTICATION_SETTINGS,
  RESPONSE_RP_GET_DEVICE_AUTHENTICATION_SETTINGS
} from '../../../main/utils/IPCEvents'
import { createSelector } from 'reselect'

export const requestOpenWebData =
  (param = {}) =>
  (dispatch) => {
    window.electron.ipcRenderer.once(
      RESPONSE_RP_GET_DEVICE_AUTHENTICATION_SETTINGS,
      (event, arg) => {
        // console.log(arg);
        if (arg.success) {
          dispatch(
            initOpenWebData({
              IPAddress: param.IPAddress,
              URL: `http://${arg.data.username}:${arg.data.password}@${param.IPAddress}`
            })
          )
        }
      }
    )
    window.electron.ipcRenderer.send(REQUEST_MP_GET_DEVICE_AUTHENTICATION_SETTINGS, {
      MACAddress: param.MACAddress
    })
  }

export const openWebSlice = createSlice({
  name: 'openWebSlice',
  initialState: {
    URL: '',
    IPAddress: ''
  },
  reducers: {
    changeNextUrl: (state) => {
      return {
        ...state,
        URL: `https://${state.IPAddress}`
      }
    },
    clearOpenWebData: () => {
      return {
        URL: '',
        IPAddress: ''
      }
    },
    initOpenWebData: (state, action) => {
      return action.payload
    }
  }
})

export const { changeNextUrl, clearOpenWebData, initOpenWebData } = openWebSlice.actions
const memoizedOpenWebSelector = (state) => state.openWeb
export const openWebSelector = createSelector(memoizedOpenWebSelector, ({ URL, IPAddress }) => ({
  URL,
  IPAddress
}))
export default openWebSlice
