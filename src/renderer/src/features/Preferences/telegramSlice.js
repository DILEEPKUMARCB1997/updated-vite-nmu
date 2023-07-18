import { createSlice } from '@reduxjs/toolkit'
import {
  RESPONSE_RP_SET_TELEGRAM_TOKEN,
  REQUEST_MP_SET_TELEGRAM_TOKEN,
  REQUEST_MP_DELETE_TELEGRAM_USER,
  RESPONSE_RP_DELETE_TELEGRAM_USER,
  RESPONSE_RP_GET_TELEGRAM_USER,
  REQUEST_MP_GET_TELEGRAM_USER,
  RESPONSE_RP_SET_TELEGRAM_USER,
  REQUEST_MP_SET_TELEGRAM_USER,
  RESPONSE_RP_GET_TELEGRAM_TOKEN,
  REQUEST_MP_GET_TELEGRAM_TOKEN
} from '../../../../main/utils/IPCEvents'
import { notification } from 'antd'
import { updateLoadingVisible } from './preferenceSlice'

export const getTelegramToken = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_TELEGRAM_TOKEN, (event, arg) => {
    if (arg.success) {
      dispatch(setSavedTelegramToken(arg.data.token))
      dispatch(updateLoadingVisible())
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_TELEGRAM_TOKEN)
  dispatch(updateLoadingVisible())
}

export const saveTelegramToken = () => (dispatch, getState) => {
  const { telegramToken } = getState().telegram
  window.electron.ipcRenderer.once(RESPONSE_RP_SET_TELEGRAM_TOKEN, (event, arg) => {
    if (arg.success) {
      dispatch(setSavedTelegramToken(telegramToken))
      dispatch(setTelegramToken(''))
      notification.success({ message: 'Successfully saved telegram token.' })
    } else {
      notification.error({ message: arg.msg })
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SET_TELEGRAM_TOKEN, {
    token: telegramToken
  })
}

export const getTelegramUser = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_TELEGRAM_USER, (event, arg) => {
    if (arg.success) {
      console.log(arg.data)
      dispatch(setTelegramUser(arg.data))
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_TELEGRAM_USER)
}

export const saveTelegramUser = (params) => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_SET_TELEGRAM_USER, (event, arg) => {
    if (arg.success) {
      notification.success({ message: 'Successfully saved telegram user.' })
      dispatch(getTelegramUser())
    } else {
      notification.error({ message: arg.msg })
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SET_TELEGRAM_USER, params)
}

export const deleteTelegramUser = (params) => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_DELETE_TELEGRAM_USER, (event, arg) => {
    if (arg.success) {
      notification.success({ message: 'Successfully deleted telegram user.' })
      dispatch(getTelegramUser())
    } else {
      notification.error({ message: arg.msg })
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_DELETE_TELEGRAM_USER, params)
}

const telegramSlice = createSlice({
  name: 'telegramSlice',
  initialState: {
    savedTelegramToken: '',
    telegramToken: '',
    userData: [],
    validsData: {
      isTokenValid: true
    },
    isConfigChange: false
  },
  reducers: {
    setTelegramToken: (state, { payload }) => {
      return { ...state, telegramToken: payload }
    },
    setSavedTelegramToken: (state, { payload }) => {
      return { ...state, savedTelegramToken: payload }
    },
    setTelegramUser: (state, { payload }) => {
      console.log(payload)
      return { ...state, userData: payload }
    }
  }
})

export const { setTelegramToken, setSavedTelegramToken, setTelegramUser } = telegramSlice.actions

export const telegramSelector = (state) => {
  const { savedTelegramToken, telegramToken, userData, validsData, isConfigChange } = state.telegram
  return { savedTelegramToken, telegramToken, userData, validsData, isConfigChange }
}

export default telegramSlice
