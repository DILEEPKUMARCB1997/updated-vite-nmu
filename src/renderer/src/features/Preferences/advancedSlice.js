import { createSlice } from '@reduxjs/toolkit'
import { updateLoadingVisible } from './preferenceSlice'
import {
  RESPONSE_RP_SETALL_ADVANCED_SETTINGS,
  REQUEST_MP_SET_ALL_ADVANCED_SETTINGS,
  RESPONSE_RP_GET_ALL_ADVANCED_SETTINGS,
  REQUEST_MP_GET_ALL_ADVANCED_SETTINGS
} from '../../../../main/utils/IPCEvents'

const valueFormat = {
  common: {
    words2: /^\d{0,2}$/,
    words4: /^\d{0,4}$/
  },
  device: {
    USERNAME_MAX_LENGTH: 255,
    PASSWORD_MAX_LENGTH: 255
  },
  FWUpdate: {
    BATCH_QUANTITY_MAX: 99,
    BATCH_QUANTITY_MIN: 1,
    CONNECT_TIMEOUT_MAX: 9999,
    CONNECT_TIMEOUT_MIN: 2000
  },
  offline: {
    POLL_INTERVAL_MAX: 9999,
    POLL_INTERVAL_MIN: 1,
    TIMEOUT_MAX: 9999,
    TIMEOUT_MIN: 2000
  }
}
const getStateOfSetValue = (state, payload) => ({
  isConfigChange: true,
  advancedData: {
    ...state.advancedData,
    ...payload
  }
})
const getStateOfFormatValid = (state, valid) => ({
  validsData: {
    ...state.validsData,
    ...valid
  }
})
export const requestSetAdvancedData = (callback) => (dispatch, getState) => {
  const { advancedData } = getState().advanced
  window.electron.ipcRenderer.once(RESPONSE_RP_SETALL_ADVANCED_SETTINGS, (event, arg) => {
    //console.log(arg);
    callback(arg.success)
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SET_ALL_ADVANCED_SETTINGS, advancedData)
}
export const requestGetAdvancedData = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_ALL_ADVANCED_SETTINGS, (event, arg) => {
    //console.log(arg);
    if (arg.success) {
      dispatch(initAdvancedData(arg.data))
      dispatch(updateLoadingVisible())
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_ALL_ADVANCED_SETTINGS)
  dispatch(updateLoadingVisible())
}
const advancedSlice = createSlice({
  name: 'advancedSlice',
  initialState: {
    isConfigChange: false,
    advancedData: {},
    validsData: {
      isDefaultUsernameValid: true,
      isDefaultPasswordValid: true,
      isFWUpdateBatchQuantityValid: true,
      isFWUpdateConnTimeoutValid: true,
      isOfflinePollIntervalValid: true,
      isOfflineTimeoutValid: true
    }
  },
  reducers: {
    setDefaultUsername: (state, action) => {
      const defaultUsername = action.payload
      const isDefaultUsernameValid = defaultUsername.length < valueFormat.device.USERNAME_MAX_LENGTH
      return {
        ...state,
        ...getStateOfSetValue(state, { defaultUsername }),
        ...getStateOfFormatValid(state, { isDefaultUsernameValid })
      }
    },
    setDefaultPassword: (state, action) => {
      const defaultPassword = action.payload
      const isDefaultPasswordValid = defaultPassword.length < valueFormat.device.PASSWORD_MAX_LENGTH
      return {
        ...state,
        ...getStateOfSetValue(state, { defaultPassword }),
        ...getStateOfFormatValid(state, { isDefaultPasswordValid })
      }
    },
    setFWUpdateBatchQuantity: (state, action) => {
      const { payload } = action
      if (!valueFormat.common.words2.test(payload)) {
        return { ...state }
      }
      const fwUpdateBatchQuantity = Number(payload)
      const isFWUpdateBatchQuantityValid =
        payload <= valueFormat.FWUpdate.BATCH_QUANTITY_MAX &&
        payload >= valueFormat.FWUpdate.BATCH_QUANTITY_MIN
      return {
        ...state,
        ...getStateOfSetValue(state, { fwUpdateBatchQuantity }),
        ...getStateOfFormatValid(state, { isFWUpdateBatchQuantityValid })
      }
    },
    setFWUpdateConnectionTimeout: (state, action) => {
      const { payload } = action
      if (!valueFormat.common.words4.test(payload)) {
        return { ...state }
      }
      const fwUpdateConnTimeout = Number(payload)
      const isFWUpdateConnTimeoutValid =
        payload <= valueFormat.FWUpdate.CONNECT_TIMEOUT_MAX &&
        payload >= valueFormat.FWUpdate.CONNECT_TIMEOUT_MIN
      return {
        ...state,
        ...getStateOfSetValue(state, { fwUpdateConnTimeout }),
        ...getStateOfFormatValid(state, { isFWUpdateConnTimeoutValid })
      }
    },
    setOfflinePollInterval: (state, action) => {
      const { payload } = action
      if (!valueFormat.common.words4.test(payload)) {
        return { ...state }
      }
      const offlinePollInterval = Number(payload)
      const isOfflinePollIntervalValid =
        offlinePollInterval <= valueFormat.offline.POLL_INTERVAL_MAX &&
        offlinePollInterval >= valueFormat.offline.POLL_INTERVAL_MIN
      return {
        ...state,
        ...getStateOfSetValue(state, { offlinePollInterval }),
        ...getStateOfFormatValid(state, { isOfflinePollIntervalValid })
      }
    },
    setOfflineTimeout: (state, action) => {
      const { payload } = action
      if (!valueFormat.common.words4.test(payload)) {
        return { ...state }
      }
      const offlineTimeout = Number(payload)
      const isOfflineTimeoutValid =
        payload <= valueFormat.offline.TIMEOUT_MAX && payload >= valueFormat.offline.TIMEOUT_MIN
      return {
        ...state,
        ...getStateOfSetValue(state, { offlineTimeout }),
        ...getStateOfFormatValid(state, { isOfflineTimeoutValid })
      }
    },
    initAdvancedData: (state, action) => {
      return { ...state, advancedData: action.payload }
    }
  }
})
export const {
  setDefaultUsername,
  setDefaultPassword,
  setFWUpdateBatchQuantity,
  setFWUpdateConnectionTimeout,
  setOfflinePollInterval,
  setOfflineTimeout,
  initAdvancedData
} = advancedSlice.actions

export const advancedSelector = (state) => {
  const {
    isConfigChange,
    advancedData,
    isDefaultUsernameValid,
    isDefaultPasswordValid,
    isFWUpdateBatchQuantityValid,
    isFWUpdateConnTimeoutValid,
    isOfflinePollIntervalValid,
    isOfflineTimeoutValid
  } = state.advanced
  return {
    isConfigChange,
    advancedData,
    isDefaultUsernameValid,
    isDefaultPasswordValid,
    isFWUpdateBatchQuantityValid,
    isFWUpdateConnTimeoutValid,
    isOfflinePollIntervalValid,
    isOfflineTimeoutValid
  }
}

export default advancedSlice
