import { createSlice } from '@reduxjs/toolkit'

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
    }
  }
})
export const { setDefaultUsername, setDefaultPassword } = advancedSlice.actions

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
